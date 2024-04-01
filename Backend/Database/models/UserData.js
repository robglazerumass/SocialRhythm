import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({  
    user_first_name: String,
    user_last_name: String,
    username: String,
    password: String
}, {collection: 'User Data'});

const UserData = model('User Data', userSchema);
export {UserData};