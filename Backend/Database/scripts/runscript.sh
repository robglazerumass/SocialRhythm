#!/bin/sh
source ../../.env
if [[ -z "$1" ]]
then
    mongosh "mongodb+srv://gouweijan:${DB_PASSWORD}@socialrhythmdb.fupvhxa.mongodb.net/SocialRhythmnDB?retryWrites=true&w=majority&appName=SocialRhythmDB"
else
    mongosh "mongodb+srv://gouweijan:${DB_PASSWORD}@socialrhythmdb.fupvhxa.mongodb.net/SocialRhythmnDB?retryWrites=true&w=majority&appName=SocialRhythmDB" < $1
fi