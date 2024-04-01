import {run} from './DB_Test.js';
import express from "express";
import mongoose from 'mongoose';

const app = express();
const uri = 'mongodb+srv://gouweijan:<password>@socialrhythmdb.fupvhxa.mongodb.net/SocialRhythmnDB?retryWrites=true&w=majority&appName=SocialRhythmDB';

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        run(); 
    } catch(error){
        console.error(error);
    }
}

connect();
app.listen(8000, ()=> {console.log("Server started on port 8000");});


