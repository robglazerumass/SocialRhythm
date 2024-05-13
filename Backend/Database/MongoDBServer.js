import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const password = process.env.DB_PASSWORD;
const uri = 'mongodb+srv://gouweijan:' + password + '@socialrhythmdb.fupvhxa.mongodb.net/SocialRhythmnDB?retryWrites=true&w=majority&appName=SocialRhythmDB';

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.error(error);
    }
}

async function disconnect() {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");

    } catch (error) {
        console.error(error);
    }
}

export { connect, disconnect };


