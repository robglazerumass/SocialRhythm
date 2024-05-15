import express, { query } from "express";
import cors from 'cors';
import { connect, disconnect } from './Database/MongoDBServer.js';
import { BackendErrorType } from "./src/BackendError.js";
import bodyParser from 'body-parser';

// Import the abstracted helper functions from the other files
import { searchSpotify } from "./src/spotify.js";
import { login, signup } from "./src/account.js";
import { feed, createPost, deletePost, rating, createComment, getComments } from "./src/posts.js";
import { profile, follow, unfollow, search } from "./src/users.js";

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

/**
 * Search query field: { username, password }
 * Login API endpoint.
 * Validates the username and password provided in the query parameters.
 * If valid, returns a JSON object with a success message and account information.
 * If invalid, throws a backend error with an appropriate message.
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
app.get('/api/login', async (req, res, next) => {
    try {
        let query = req.query;
        if (!isValidQuery([query.username, query.password]))
            throw BackendErrorType.INVALID_QUERY;
        let responseData = await login(query.username, query.password);
        res.json(responseData);

    } catch (error) {
        next(error);
    }
});

/**
 * Signup query field: { firstname, lastname, username, password, email }
 * Signup API endpoint.
 * Validates the query parameters and creates a new user account.
 * If successful, returns a JSON object with a success message.
 * If invalid, throws a backend error with an appropriate message.
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

        const responseData = await signup(query.firstname, query.lastname, query.username, query.password, query.email);
        res.json(responseData);

    } catch (error) {
        next(error);
    }
})

/**
 * Search query field: { username, xPosts, pageNum}
 * Retrieves a list of posts for the user's feed based on the provided parameters.
 * If successful, returns a JSON object with the user's feed.
 * If invalid, throws a backend error with an appropriate message.
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

        let result = await feed(query.username, query.xPosts, query.pageNum)

        res.json(result);
    }
    catch (error) {
        next(error)
    }
})

/**
 * Search query field: { username }
 * Retrieves the profile of the user with the provided username, along with their associated posts.
 * If successful, returns a JSON object with the user's profile information and their associated posts.
 * If invalid, throws a backend error with an appropriate message.
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

        let result = await profile(query.username)
        res.json(result)
    }
    catch (error) {
        next(error)
    }
})

/**
 * Search query field: { username, userToFollow }
 * User with the provided username follows the user with the provided userToFollow.
 * If successful, returns a JSON object with a success message if the user is now following the target user.
 * If invalid, throws a backend error with an appropriate message.
 * @httpMethod POST
 * @example
 * Request:
 *   POST /api/follow?username=johndoe&userToFollow=janedoe
 * Response (Success):
 *  {
 *  "result": "SUCCESS"
 * }
 * Response (Error): // See BackendError.js for more information
*/
app.post('/api/follow', async (req, res, next) => {
    try {
        let { username, userToFollow } = req.query;

        if (!isValidQuery([username, userToFollow])) {
            throw BackendErrorType.INVALID_QUERY;
        }

        let result = await follow(username, userToFollow);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * Search query field: { username, userToUnfollow }
 * User with the provided username unfollows the user with the provided userToUnfollow.
 * If successful, returns a JSON object with a success message if the user has unfollowed the target user.
 * If invalid, throws a backend error with an appropriate message.
 * @httpMethod POST
 * @example
 * Request:
 *   POST /api/unfollow?username=johndoe&userToUnfollow=janedoe
 * Response (Success):
 *  {
 *  "result": "SUCCESS"
 * }
 * Response (Error): // See BackendError.js for more information
*/
app.post('/api/unfollow', async (req, res, next) => {
    try {
        let { username, userToUnfollow } = req.query;

        if (!isValidQuery([username, userToUnfollow])) {
            throw BackendErrorType.INVALID_QUERY;
        }

        let result = await unfollow(username, userToUnfollow);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

//Search query field: {searchTerm}
// takes in a query with above field and returns an array of JSON results or throws a Backend Error
//The following endpoint recieves a searchTerm related to a user and queries the database using
//autocomplete, along with fuzzy search, to find similar results, weighing them on accuracy,
//and the type of category the searchTerm may be in (user_first_name || username || user_last_name)

/**
 * Search query field: { searchTerm }
 * Searches for users based on the provided search term.
 * If successful, returns an array of JSON results.
 * If invalid, throws a backend error with an appropriate message.
 * @httpMethod GET
 * @example
 * Request:
 *   GET /api/search?searchTerm=johndoe
 * Response (Success):
 *  [
 *     {
 *      "_id": "5ff8ac275c821433f8f59c29",
 *      "user_first_name": "John",
 *      "user_last_name": "Doe",
 *      "username" = "johndoe",
 *      }
 *     // Additional users...
 * ]    
 * Response (Error): // See BackendError.js for more information
*/
app.get("/api/search", async (req, res, next) => {
    try {
        let query = req.query;

        //Validate the query
        if (!isValidQuery([query.searchTerm]))
            throw BackendErrorType.INVALID_QUERY;

        let result = await search(query.searchTerm);
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


/**
 * Create Post body fields: { username, title, description, spotify_link(OPTIONAL), image_url(OPTIONAL) }
 * Creates a new post based on the provided information.
 * If successful, returns a JSON object with a success message.
 * If invalid, throws a backend error with an appropriate message.
 * @httpMethod POST
 * @example
 * Request:
 *   POST /api/createPost
 *      {
 *      "username": "johndoe",
 *      "title": "Example Post",
 *      "description": "This is an example post.",
 *      "spotify_link": "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp",
 *      "image_url": "https://example.com/image.jpg"
 *      }
 * Response (Success):
 *   {
 *     "result": "SUCCESS",
 *    "message": "New Post Created"
 * }
 * 
 */
app.post('/api/createPost', bodyParser.json(), async (req, res, next) => {
    console.log(req.body);
    try {
        let body = req.body;
        if (!isValidQuery([body.username, body.title, body.description]))
            throw BackendErrorType.MISSING_FIELDS;
        let responseData = await createPost(body.username, body.title, body.description, body.spotify_link, body.image_url);
        res.json(responseData);
    } catch (error) {
        next(error);
    }
});

/**
 * Search query field: { postId }
 * Deletes a post with the provided postId.
 * If successful, returns a JSON object with a success message if the post is deleted successfully.
 * If invalid, throws a backend error with an appropriate message.
 * @httpMethod DELETE
 * @example
 * Request:
 *   DELETE /api/deletePost?postId=60a5c3f1d9b2a52a3c8d0f1c
 * Response (Success):
 *  {
 *    "message": "Post with ID 60a5c3f1d9b2a52a3c8d0f1c has been deleted"
 *  }
 * Response (Error): // See BackendError.js for more information
*/
app.delete('/api/deletePost', async (req, res, next) => {
    try {
        let { postId } = req.query;

        if (!isValidQuery([postId])) {
            throw BackendErrorType.INVALID_QUERY;
        }

        let result = await deletePost(postId);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * Search query field: { requestType, ratingType, username, destId }
 * Takes in a request with above fields and adds or removes a like or dislike from 
 * a post or comment.
 * If successful, returns a JSON object with a success message.
 * If invalid, throws a backend error with an appropriate message.
 * @httpMethod POST
 * @example
 * Request:
 *   POST /api/Rating?requestType=add&ratingType=like&username=johndoe&destId=5ff8ac275c821433f8f59c29
 * Response (Success):
 *  {
 *   "result": "SUCCESS"
 *  }
 * Response (Error): // See BackendError.js for more information
 */
app.post("/api/Rating", async (req, res, next) => {
    try {
        let query = req.query;
        if (!isValidQuery([query.requestType, query.ratingType, query.username, query.destId]))
            throw BackendErrorType.INVALID_QUERY;

        let result = await rating(query.requestType, query.ratingType, query.username, query.destId);
        res.json(result);

    } catch (error) {
        next(error);
    }
});


/**
 * Search query field: { username, postId, commentString }
 * Creates a new comment on a post specified by the provided postId.
 * If successful, returns a JSON object with a success message.
 * If invalid, throws a backend error with an appropriate message.
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
app.post('/api/createComment', async (req, res, next) => {
    try {
        let query = req.query

        if (!isValidQuery([query.username, query.postId, query.commentString]))
            throw BackendErrorType.INVALID_QUERY

        let result = await createComment(query.username, query.postId, query.commentString)
        res.json(result)
    }
    catch (error) {
        if (error.name === 'CastError') {
            next(BackendErrorType.POST_DNE)
        } else {
            next(error);
        }
    }

});

/**
 * Search query field: { postId }
 * Retrieves the comments associated with the specified post.
 * If successful, returns a JSON object with the comments.
 * If invalid, throws a backend error with an appropriate message.
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
app.get('/api/getComments', async (req, res, next) => {
    try {
        let query = req.query

        if (!isValidQuery([query.postId]))
            throw BackendErrorType.INVALID_QUERY

        let comments = await getComments(query.postId)
        res.json(comments)
    }
    catch (error) {
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

// Launch server

let server;

export async function start() {
    if (server)
        return;
    await connect();
    server = app.listen(port, () => console.log(`App is running on port ${port}`));
}

export async function stop() {
    server.close();
    await disconnect();
}

await start();