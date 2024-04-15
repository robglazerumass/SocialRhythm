import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//user_friends_list is a list of user id values
//user_post_list is a list of post id values
const userSchema = new Schema({  
    user_first_name: String,
    user_last_name: String,
    user_email: String,
    username: String,
    password: String,
    user_bio: String, 
    user_friends_list: [String],
    user_post_list: [String]
}, {collection: 'User Data'});
const UserData = model('User Data', userSchema);

//likes_list and dislikes_list are lists are user id values
//comments_list is a list of comment id values
const postSchema = new Schema({  
    user_id: String,
    username: String,
    title: String,
    description: String,
    spotify_link: String,
    image_url: String,
    likes_list: [String],
    dislikes_list: [String],
    comments_list: [String]
}, {collection: 'Post Data'});
const PostData = model('Post Data', postSchema);

//comment_like_list and comment_dislike_list are both lists of user id values 
const commentSchema = new Schema({  
    post_id: String,
    user_id: String,
    comment_string: String,
    comment_like_list: [String],
    comment_dislike_list: [String]
}, {collection: 'Comment Data'});
const CommentData = model('Comment Data', commentSchema);

export {UserData, PostData, CommentData};
