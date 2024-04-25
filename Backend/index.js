import express, { query } from "express";
import cors from 'cors';
import { connect } from './Database/MongoDBServer.js';
import { UserData, PostData, CommentData} from "./Database/models/DB_Schemas.js";
import { BackendErrorType } from "./BackendError.js";
import {ObjectId} from "mongodb";

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send({ worked: true });
});

// query is the list of query fields you are expecting
// ex: implemented in code for login : isValidQuery([query.username, query.password])
// checks if any query field you are expecting is undefined
function isValidQuery(queryList){
    return queryList.every(field => field !== undefined);
}


//Login query fields: { username, password }
// takes in a query with above fields and returns a JSON Success or throws a Backend Error
app.get('/api/login', async (req, res, next) => {
    try {
        let query = req.query;
        if(!isValidQuery([query.username, query.password]))
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

// Signup query fields : { firsname, lastname, username, password, email }
// takes in a query with above fields and returns a JSON Success or throws a Backend Error
app.post('/api/signup', async (req, res, next) => {
    try {
        let query = req.query;
        if(!isValidQuery([query.firstname, query.lastname, query.username, query.password, query.email]))
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
            user_following_list: [new ObjectId()], 
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

// feed fields: { userId, xPosts, pageNum }
// pageNum starts at 0 ... N/xPosts
// takes in a query with above fields and returns a JSON list of posts or throws a Backend Error
app.get('/api/feed', async (req, res, next) => {
    try{
        const query = req.query
        if(!isValidQuery([query.userId, query.xPosts, query.pageNum]))
            throw BackendErrorType.INVALID_QUERY

        let user = await UserData.findOne({_id: query.userId})

        if(user === null || user === undefined)
            throw BackendErrorType.USER_DNE

        if(query.pageNum < 0)
            throw BackendErrorType.INVALID_FEED_PAGE

        const followingList = user.user_following_list

        if(followingList === undefined || followingList.length === 0)
            throw BackendErrorType.FEED_DNE
        
        // sorted by most recent
        let result = await PostData.find({$or: followingList.map(x => {return {"user_id": new ObjectId(x)}})})
            .sort({date_created: -1})
            .skip(query.pageNum * query.xPosts)
            .limit(query.xPosts)
        
        // Front-End just wanted us to return the JSON directly to them
        res.json(result);
    }
    catch (error) {
        next(error)
    }
})

//follow : {username, followUsername}
// takes in a query with above fields and returns a JSON Success or throws a Backend Error
app.post('/api/follow', async (req, res, next) => {
    try {
        const { username, followUsername } = req.query;
        if (!isValidQuery([username, friendUsername])) {
            throw BackendErrorType.INVALID_QUERY;
        }

        if (username === followUsername) {
            throw BackendErrorType.SELF_FOLLOW;
        }

        const follower = await UserData.findOne({ username: username });
        const followee = await UserData.findOne({ username: followUsername });

        if (!follower) {
            throw BackendErrorType.USER_DNE;
        }

        if (!followee) {
            throw BackendErrorType.FOLLOW_DNE;
        }

        if (follower.user_following_list.includes(followee._id)) {
            throw BackendErrorType.ALREADY_FOLLOWING;
        }   

        follower.user_following_list.push(followee._id);
        followee.user_follower_list.push(follower._id);
        await follower.save();
        await followee.save();
        res.json({ message: 'Successfully followed user.' });
    } 
    catch (error) {
        next(error);
    }
});

// Create post query fields: { userId, username, title, description, spotifyLink, imageUrl }
// takes in a query with above fields and returns a JSON Success or throws a Backend Error
app.post('/api/createpost', async (req, res, next) => {
    try {
        let { userId, username, title, description, spotifyLink, imageUrl } = req.body;

        if (!userId || !username || !title || !description) {
            throw BackendErrorType.MISSING_FIELDS;
        }

        const newPost = new PostData({
            user_id: userId,
            username: username,
            title: title,
            description: description,
            spotify_link: spotifyLink || '',
            image_url: imageUrl || '',
            likes_list: [],
            dislikes_list: [],
            comments_list: []
        });

        await newPost.save();
        res.json({ result: 'SUCCESS', message: 'Post created successfully', postId: newPost._id });

    } catch (error) {
        next(error);
    }
});

// Handles errors thrown to Express
app.use((error, req, res, next) => {
    const msg = error.message !== undefined ? error.message : "Something went wrong.";
    const status = error.status !== undefined ? error.status : 700;
    console.error(error);
    res.status(status).send(msg);
});

app.listen(port, () => console.log(`App is running on port ${port}`));
connect();
