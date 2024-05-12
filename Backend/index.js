import express, { query } from "express";
import cors from 'cors';
import { connect } from './Database/MongoDBServer.js';
import { UserData, PostData, CommentData } from "./Database/models/DB_Schemas.js";
import { BackendErrorType } from "./BackendError.js";
import { ObjectId } from "mongodb";
import bodyParser from 'body-parser';
import { searchSpotify } from "./spotify.js";

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send({ worked: true });
});

/**
 * Checks if all query fields are present.
 * @param {Array} queryList - List of query fields to be validated.
 * @returns {boolean} - Returns true if all query fields are present, false otherwise.
 */
function isValidQuery(queryList) {
    return queryList.every(field => field !== undefined);
}

function validateRating(user, post, ratingType) {
    let likes = post.likes_list;
    let dislikes = post.dislikes_list;

    if (likes.includes(user.username) || dislikes.includes(user.username)) {
        return false;
    }
    else {
        return true;
    }
}


/**
 * Retrieves user account information based on the provided username and password.
 * 
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {JSON} - An object containing the result of the login operation and user account information.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid or if the login credentials are incorrect.
 * @httpMethod GET
 * @example
 * Request:
 *    GET /api/login?username=johndoe&password=examplepassword
 * Response (Success):
 *    {
 *      "result": "SUCCESS",
 *      "account_info": "5ff8ac275c821433f8f59c29" // Example ObjectId
 *    }
 * Response (Error): // See BackendError.js for more information
 */
app.get('/api/login', async (req, res, next) => {
    try {
        let query = req.query;
        if (!isValidQuery([query.username, query.password]))
            throw BackendErrorType.INVALID_QUERY;

        let result = await UserData.findOne({ username: query.username, password: query.password });

        if (result == null)
            throw BackendErrorType.INVALID_LOGIN;

        const responseData = { result: 'SUCCESS', account_info: result._id };
        res.json(responseData);

    } catch (error) {
        next(error);
    }
});

/**
 * Creates a new user account based on the provided information.
 * 
 * @param {string} firstname - The first name of the user.
 * @param {string} lastname - The last name of the user.
 * @param {string} username - The desired username for the new account.
 * @param {string} password - The password for the new account.
 * @param {string} email - The email address of the user.
 * @returns {Object} - An object containing the result of the signup operation and a success message if successful.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid, if the username already exists,
 *                              or if there's an error during user creation.
 * @httpMethod POST
 * @example
 * Request:
 *    POST /api/signup?firstname=John&lastname=Doe&username=johndoe&password=examplepassword&email=johndoe@example.com
 * Response (Success):
 *    {
 *      "result": "SUCCESS",
 *      "message": "New Account Created"
 *    }
 * Response (Error): // See BackendError.js for more information
 */
app.post('/api/signup', async (req, res, next) => {
    try {
        let query = req.query;
        if (!isValidQuery([query.firstname, query.lastname, query.username, query.password, query.email]))
            throw BackendErrorType.INVALID_QUERY;

        let result = await UserData.findOne({ username: query.username })

        if (result != null)
            throw BackendErrorType.USERNAME_EXISTS;

        // create a new user
        const user = await UserData.create({
            user_first_name: query.firstname,
            user_last_name: query.lastname,
            user_email: query.email,
            username: query.username,
            password: query.password,
            user_bio: "",
            user_following_list: [],
            user_follower_list: [],
            user_post_list: [],
            date_created: new Date(),
        });

        const responseData = { result: 'SUCCESS', message: 'New Account Created' };
        res.json(responseData);

    } catch (error) {
        next(error);
    }
})

/**
 * Retrieves a list of posts for the user's feed based on the provided parameters.
 * 
 * @param {string} username - The username of the user.
 * @param {number} xPosts - The number of posts per page.
 * @param {number} pageNum - The page number (starting from 0).
 * @returns {Array} - An array of post objects sorted by most recent.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid, if the user does not exist,
 *                              if the page number is invalid, or if the feed is empty.
 * @httpMethod GET
 * @example
 * Request:
 *    GET /api/feed?username=johndoe&xPosts=10&pageNum=0
 * Response (Success):
 *    [
 *      {
 *          "_id": "5ff8ac275c821433f8f59c29",
 *          "username": "johndoe",
 *          "title": "Example Post",
 *          "description": "This is an example post.",
 *          "date_created": "2023-05-10T12:00:00Z",
 *          // Additional fields...
 *      },
 *      // Additional posts...
 *    ]
 * Response (Error): // See BackendError.js for more information
 */
app.get('/api/feed', async (req, res, next) => {
    try {
        const query = req.query
        if (!isValidQuery([query.username, query.xPosts, query.pageNum]))
            throw BackendErrorType.INVALID_QUERY

        let user = await UserData.findOne({ username: query.username })

        if (user === null || user === undefined)
            throw BackendErrorType.USER_DNE

        if (query.pageNum < 0)
            throw BackendErrorType.INVALID_FEED_PAGE

        const followingList = user.user_following_list

        if (followingList === undefined || followingList.length === 0)
            throw BackendErrorType.FEED_DNE

        // sorted by most recent
        let result = await PostData.find({ $or: followingList.map(x => { return { "username": x } }) })
            .sort({ date_created: -1 })
            .skip(query.pageNum * query.xPosts)
            .limit(query.xPosts)

        // Front-End just wanted us to return the JSON directly to them
        res.json(result);
    }
    catch (error) {
        next(error)
    }
})

/**
 * Retrieves the profile of the user with the provided username, along with their associated posts.
 * 
 * @param {string} username - The username of the user whose profile to retrieve.
 * @returns {Object} - An object containing the user's profile information and their associated posts.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid or if the user does not exist.
 * @httpMethod GET
 * @example
 * Request:
 *    GET /api/profile?username=johndoe
 * Response (Success):
 *    {
 *      "user_first_name": "John",
 *      "user_last_name": "Doe",
 *      "user_email": "john.doe@example.com",
 *      "username": "johndoe",
 *      "user_bio": "Lorem ipsum dolor sit amet...",
 *      "user_following_list": ["user1", "user2", "user3"],
 *      "user_follower_list": ["user4", "user5"],
 *      "user_post_list": [
 *          {
 *              "_id": "5ff8ac275c821433f8f59c29",
 *              "username": "johndoe",
 *              "title": "Example Post",
 *              "description": "This is an example post.",
 *              "date_created": "2023-05-10T12:00:00Z",
 *              // Additional fields...
 *          },
 *          // Additional posts...
 *      ]
 *    }
 * Response (Error): // See BackendError.js for more information
 */
app.get('/api/profile', async (req, res, next) => {
    try {
        const query = req.query
        if (!isValidQuery([query.username]))
            throw BackendErrorType.INVALID_QUERY

        let user = await UserData.findOne({ username: query.username })

        if (user === null || user === undefined)
            throw BackendErrorType.USER_DNE

        // need to return a JSON with user profile information along with the list of posts by this user

        let postList = await PostData.find({ username: query.username })

        let result = {
            user_first_name: user["user_first_name"],
            user_last_name: user["user_last_name"],
            user_email: user["user_email"],
            username: user["username"],
            user_bio: user["user_bio"],
            user_following_list: user["user_following_list"],
            user_follower_list: user["user_follower_list"],
            user_post_list: postList,
        }

        res.json(result)
    }
    catch (error) {
        next(error)
    }
})

//follow : {username, userToFollow}
// takes in a query with above fields and returns a JSON Success or throws a Backend Error
app.post('/api/follow', async (req, res, next) => {
    try {
        let { username, userToFollow } = req.query;

        if (!isValidQuery([username, userToFollow])) {
            throw BackendErrorType.INVALID_QUERY;
        }

        if (username === userToFollow) {
            throw BackendErrorType.SELF_FOLLOW;
        }

        const user = await UserData.findOne({ username: username });
        const targetUser = await UserData.findOne({ username: userToFollow });

        if (!user || !targetUser) {
            throw BackendErrorType.USER_DNE;
        }

        if (user.user_following_list.includes(userToFollow)) {
            throw BackendErrorType.ALREADY_FOLLOWING;
        }

        user.user_following_list.push(userToFollow);
        await user.save();

        targetUser.user_follower_list.push(username);
        await targetUser.save();

        res.json({ message: `You are now following ${userToFollow}` });
    } catch (error) {
        next(error);
    }
});

//Search query field: {searchTerm}
// takes in a query with above field and returns an array of JSON results or throws a Backend Error
//The following endpoint recieves a searchTerm related to a user and queries the database using
//autocomplete, along with fuzzy search, to find similar results, weighing them on accuracy,
//and the type of category the searchTerm may be in (user_first_name || username || user_last_name)
app.get("/api/search", async (req, res, next) => {
    try {
        let query = req.query;

        //Validate the query
        if (!isValidQuery([query.searchTerm]))
            throw BackendErrorType.INVALID_QUERY;

        if (query.searchTerm == '') {
            throw BackendErrorType.USER_NOT_FOUND;
        }

        let pipeline = [{
            $search: {
                index: "autoCompleteUsers",
                compound: {
                    should: [{
                        phrase: {
                            query: query.searchTerm,
                            path: "user_first_name",
                            score: { boost: { value: 10 } } /// <--- Score boosting on exact match
                        }
                    },
                    {
                        autocomplete: {
                            query: query.searchTerm,
                            path: "user_first_name",
                            fuzzy: { "prefixLength": 2 }, /// <--- The first two letters must match
                            score: { boost: { value: 10 } }
                        }
                    },
                    {
                        phrase: {
                            query: query.searchTerm,
                            path: "username",
                            score: { boost: { value: 10 } } /// <--- Score boosting on exact match
                        }
                    },
                    {
                        autocomplete: {
                            query: query.searchTerm,
                            path: "username",
                            fuzzy: { "prefixLength": 2 }, /// <--- The first two letters must match
                            score: { boost: { value: 5 } }
                        }
                    },
                    {
                        phrase: {
                            query: query.searchTerm,
                            path: "user_last_name",
                            score: { boost: { value: 10 } } /// <--- Score boosting on exact match
                        }
                    },
                    {
                        autocomplete: {
                            query: query.searchTerm,
                            path: "user_last_name",
                            fuzzy: { "prefixLength": 2 }, /// <--- The first two letters must match
                            score: { boost: { value: 2 } }
                        }
                    }
                    ]
                }
            }
        },
        {
            $limit: 20 /// <--- Limit the result array to 20
        },
        {
            $project: { /// <--- Extract only the following infromation from each result to return
                _id: 1,
                user_first_name: 1,
                user_last_name: 1,
                username: 1,
            }
        }
        ];

        let result = await UserData.aggregate(pipeline);

        if (result == 0) {
            throw BackendErrorType.USER_NOT_FOUND;
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * Search query field: { searchTerm, type, limit }. Where 'searchTerm' is a string, 'type' is a 
 * comma-separated list of strings, and 'limit' is an integer. Defaults to 
 * { "tag:new", "album,artist,track", 10 }
 * 
 * Uses the Spotify API to search music content. The full content of the object can be seen at
 * https://developer.spotify.com/documentation/web-api/. 
 * 
 * Items of each type are pruned to only contain as follows:
 * 
 * albums:
 *      type flag, artists, spotify link, images, name, release date, number of songs
 * artists:
 *      type flag, genres, spotify link, images, name, popularity 0-100
 * tracks:
 *      type flag, album, artists, duration (ms), explicit, spotify link, name, 
 *      popularity 0-100, audio preview link
 */
app.get("/api/searchContent", async (req, res, next) => {
    try {
        const query = req.query;
        const search = query.searchTerm ?? "tag:new";
        const types = query.type ?? "album,artist,track";
        const limit = query.limit ?? 10;
        let data = await searchSpotify(search.length === 0 ? "tag:new" : search, types, limit);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Create Post body fields: { username, title, description, spotify_link(OPTIONAL), image_url(OPTIONAL) }
// takes in a request body with above fields and returns a JSON Success or throws a Backend Error
app.post('/api/createPost', bodyParser.json(), async (req, res, next) => {
    try {
        let body = req.body;
        if (!isValidQuery([body.username, body.title, body.description]))
            throw BackendErrorType.MISSING_FIELDS;

        if (!body.title || !body.description)
            throw BackendErrorType.NO_TITLE_OR_DESC;

        let user = await UserData.findOne({ username: body.username });

        if (user == null)
            throw BackendErrorType.USER_DNE;

        const post = await PostData.create({
            username: body.username,
            title: body.title,
            description: body.description,
            spotify_link: body.spotify_link || '',
            image_url: body.image_url || '',
            likes_list: [],
            dislikes_list: [],
            comments_list: [],
            date_created: new Date(),
        });

        user.user_post_list.push(post._id);
        await user.save();

        const responseData = { result: 'SUCCESS', message: 'New Post Created' };
        res.json(responseData);

    } catch (error) {
        next(error);
    }
});


/**
 * Takes in a request with above fields and adds or removes a like or dislike from 
 * a post or comment.
 * 
 * @param {string} requestType - Specifies adding or removing a rating using "add" or "remove"
 * @param {string} ratingType - Specifies the rating type using either "like" or "dislike"
 * @param {string} username - Specifies the username of the user who is making the rating
 * @param {string} destId - Specifies the "_id" of the post or comment that rating should be added to
 * @returns {json or BackendError} Returns either json declaring success or throws a BackendError on failure 
 */
app.post("/api/Rating", async (req, res, next) => {
    try {
        let query = req.query;
        let result, user, dest, likes, dislikes;

        if (!isValidQuery([query.requestType, query.ratingType, query.username, query.destId]))
            throw BackendErrorType.INVALID_QUERY;

        user = await UserData.findOne({ username: query.username });

        if (user == null)
            throw BackendErrorType.USER_DNE;

        try {
            dest = await PostData.findOne({ _id: query.destId });
        }
        catch (error) {
            throw BackendErrorType.POST_DNE;
        }

        if (dest == null) {
            try {
                dest = await CommentData.findOne({ _id: query.destId });
            }
            catch (error) {
                throw BackendErrorType.COMMENT_DNE;
            }

            if (dest == null) {
                throw BackendErrorType.POST_COMMENT_DNE;
            }
            else {
                likes = dest.comment_like_list;
                dislikes = dest.comment_dislike_list;
            }
        }
        else {
            likes = dest.likes_list;
            dislikes = dest.dislikes_list;
        }

        if (query.requestType == "add") {
            if (query.ratingType == "like" && !(likes.includes(user.username) || dislikes.includes(user.username))) {
                likes.push(user.username);
                await dest.save();
            }
            else if (query.ratingType == "dislike" && !(likes.includes(user.username) || dislikes.includes(user.username))) {
                dislikes.push(user.username);
                await dest.save();
            }
            else {
                throw BackendErrorType.INVALID_RATINGTYPE;
            }
        }
        else if (query.requestType == "remove") {
            if (query.ratingType == "like" && likes.includes(user.username)) {
                likes.pull(user.username);
                await dest.save();
            }
            else if (query.ratingType == "dislike" && dislikes.includes(user.username)) {
                dislikes.pull(user.username);
                await dest.save();
            }
            else {
                throw BackendErrorType.INVALID_RATINGTYPE;
            }
        }
        else {
            throw BackendErrorType.INVALID_REQUESTTYPE;
        }

        result = { result: 'SUCCESS' };
        res.json(result);

    } catch (error) {
        next(error);
    }
});


/**
 * Creates a new comment on a post specified by the provided postId.
 * 
 * @param {string} username - The username of the user creating the comment.
 * @param {string} postId - The ID of the post on which the comment is being created.
 * @param {string} commentString - The content of the comment.
 * @returns {Object} - An object indicating the success of the comment creation.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid, if the user or post does not exist,
 *                              or if there's an error during comment creation.
 * @httpMethod POST
 * @example
 * Request:
 *    POST /api/createComment?username=johndoe&postId=5ff8ac275c821433f8f59c29&commentString=Great%20post!
 * Response (Success):
 *    {
 *      "result": "Success",
 *      "message": "Comment Created"
 *    }
 * Response (Error): // See BackendError.js for more information
 */
app.post('/api/createComment', async(req, res, next) =>{
    try {
        let query = req.query

        if(!isValidQuery([query.username, query.postId, query.commentString]))
            throw BackendErrorType.INVALID_QUERY

        // get the user
        let user = await UserData.findOne({ username: query.username })

        if (user === null || user === undefined)
            throw BackendErrorType.USER_DNE

        // get the post
        let post = await PostData.findOne({ _id : query.postId })

        if (post === null || post === undefined)
            throw BackendErrorType.POST_DNE
        
        // create a new comment
        let comment = await CommentData.create({
            post_id: query.postId,
            username: query.username,
            comment_string: query.commentString,
            comment_like_list: [],
            comment_dislike_list: [],
            date_created: new Date(),
        })

        // add comment to post
        post.comments_list.push(comment._id)
        await post.save()

        res.json({ result: 'Success', message: 'Comment Created' })
    }
    catch(error){
        if (error.name === 'CastError') {
            next(BackendErrorType.POST_DNE)
        } else {
            next(error); 
        }
    }

});


/**
 * Retrieves the comments associated with the specified post.
 * 
 * @param {string} postId - The ID of the post for which comments are to be retrieved.
 * @returns {Array} - An array containing the comments associated with the specified post.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid or if the post does not exist.
 * @httpMethod GET
 * @example
 * Request:
 *    GET /api/getComments?postId=5ff8ac275c821433f8f59c29
 * Response (Success):
 *    [
 *      {
 *          "_id": "610b123dd3643f001e2156a2",
 *          "post_id": "5ff8ac275c821433f8f59c29",
 *          "username": "johndoe",
 *          "comment_string": "Great post!",
 *          "comment_like_list": [],
 *          "comment_dislike_list": [],
 *          "date_created": "2023-05-10T12:00:00Z"
 *      },
 *      // Additional comments...
 *    ]
 * Response (Error): // See BackendError.js for more information
 */
app.get('/api/getComments', async(req, res, next) => {
    try{
        let query = req.query

        if(!isValidQuery([query.postId]))
            throw BackendErrorType.INVALID_QUERY

        let post = await PostData.findOne({ _id : query.postId })

        if(post === null || post === undefined)
            throw BackendErrorType.POST_DNE
        
        let comments = await CommentData.find({ post_id : query.postId })
            .sort({ date_created: 1 })

        res.json(comments)
    }
    catch(error){
        if (error.name === 'CastError') {
            next(BackendErrorType.POST_DNE)
        } else {
            next(error); 
        }
    }
})

// Handles errors thrown to Express
app.use((error, req, res, next) => {
    const msg = error.message !== undefined ? error.message : "Something went wrong.";
    const status = error.status !== undefined ? error.status : 700;
    console.error(error);
    res.status(status).send(msg);
});

app.listen(port, () => console.log(`App is running on port ${port}`));
connect();
