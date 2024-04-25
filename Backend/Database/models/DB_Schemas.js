import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import {ObjectId} from "mongodb";



//user_following_list and user_follower_list is a list of user id values
//user_post_list is a list of post id values
//date_created is a Date object in UTC
const userSchema = new Schema({  
    user_first_name: String,
    user_last_name: String,
    user_email: String,
    username: String,
    password: String,
    user_bio: String, 
    user_following_list: [String],
    user_follower_list: [String],
    user_post_list: [ObjectId],
    date_created: Date, 
}, {collection: 'User Data'});
const UserData = model('User Data', userSchema);

//likes_list and dislikes_list are lists are user id values
//comments_list is a list of comment id values
//date_created is a Date object in UTC
const postSchema = new Schema({  
    username: String,
    title: String,
    description: String,
    spotify_link: String,
    image_url: String,
    likes_list: [String],
    dislikes_list: [String],
    comments_list: [ObjectId],
    date_created: Date,
}, {collection: 'Post Data'});
const PostData = model('Post Data', postSchema);

//comment_like_list and comment_dislike_list are both lists of user id values
//date_created is a Date object in UTC
const commentSchema = new Schema({  
    post_id: ObjectId,
    username: String,
    comment_string: String,
    comment_like_list: [String],
    comment_dislike_list: [String],
    date_created: Date,
}, {collection: 'Comment Data'});
const CommentData = model('Comment Data', commentSchema);

export {UserData, PostData, CommentData};
