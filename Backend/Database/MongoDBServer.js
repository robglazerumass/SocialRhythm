import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.JEST_WORKER_ID === undefined ? "SocialRhythmnDB" : "SocialRhythmnDBTest"
const password = process.env.DB_PASSWORD;
const uri = 'mongodb+srv://gouweijan:' + password + `@socialrhythmdb.fupvhxa.mongodb.net/${db}?retryWrites=true&w=majority&appName=SocialRhythmDBTest`;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log(`Connected to MongoDB using ${db}`);

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


