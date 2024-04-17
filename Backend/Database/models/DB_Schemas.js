import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import {ObjectId} from "mongodb";



//user_friends_list is a list of user id values
//user_post_list is a list of post id values
const userSchema = new Schema({  
    user_first_name: String,
    user_last_name: String,
    user_email: String,
    username: String,
    password: String,
    user_bio: String, 
    user_following_list: [ObjectId],
    user_follower_list: [ObjectId],
    user_post_list: [ObjectId],
    date_created: Date,
}, {collection: 'User Data'});
const UserData = model('User Data', userSchema);

//likes_list and dislikes_list are lists are user id values
//comments_list is a list of comment id values
const postSchema = new Schema({  
    user_id: ObjectId,
    username: String,
    title: String,
    description: String,
    spotify_link: String,
    image_url: String,
    likes_list: [ObjectId],
    dislikes_list: [ObjectId],
    comments_list: [ObjectId],
    date_created: Date,
}, {collection: 'Post Data'});
const PostData = model('Post Data', postSchema);

//comment_like_list and comment_dislike_list are both lists of user id values 
const commentSchema = new Schema({  
    post_id: ObjectId,
    user_id: ObjectId,
    username: String,
    comment_string: String,
    comment_like_list: [ObjectId],
    comment_dislike_list: [ObjectId],
    date_created: Date,
}, {collection: 'Comment Data'});
const CommentData = model('Comment Data', commentSchema);

export {UserData, PostData, CommentData};
