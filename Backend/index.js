import express from "express";
import { connect } from './Database/MongoDBServer.js';
import { UserData } from "./Database/models/UserData.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send({ worked: true });
});

app.get('/api/login', async (req, res) => {
    let responseData;
    let result = await UserData.findOne({username: req.query.name});

    if(result == null){
        responseData = {result: 'FAILURE', message: 'Failed to login, username could not be found'};
    }
    else{
        result = await UserData.find({username: req.query.name, password: req.query.pass});
        
        if(result.length == 0){
            responseData = {result: 'FAILURE', message: 'Failed to login, password is invalid'};
        }
        else{
            responseData = {result: 'SUCCESS', account_info: result[0]._id};
        }
    }

    res.json(responseData);
  });

app.listen(port, () => console.log(`App is running on port ${port}`));
connect();