import mongoose from 'mongoose';

const uri = 'mongodb+srv://gouweijan:<password>@socialrhythmdb.fupvhxa.mongodb.net/SocialRhythmnDB?retryWrites=true&w=majority&appName=SocialRhythmDB';

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

    } catch(error){
        console.error(error);
    }
}

export {connect};


