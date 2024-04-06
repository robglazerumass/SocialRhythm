import express from "express";
import { connect } from './Database/MongoDBServer.js';
import { UserData } from "./Database/models/UserData.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send({ worked: true });
});

app.get('/api/login', async (req, res) => {
    // TODO Fix the query names for name and password
    let responseData;
    let result = await UserData.find({username: req.query.name, password: req.query.pass});
    
    if(result.length == 0)
        responseData = {result: 'FAILURE', message: 'Failed to Login, Username or Password Incorrect'};
    else
        responseData = {result: 'SUCCESS', account_info: result[0]._id};

    
    res.json(responseData);
  });


app.get('/api/signup', async (req, res) => {
    let responseData;
    let query = req.query
    // Check that username is unique
    let result = await UserData.find({username: query.username})

    if (result.length > 0)
        responseData = {result: 'FAILURE', message: 'Username Already Exists'};
    else{
        // create a new user

        const user = await UserData.create({
            user_first_name: query.firstname,
            user_last_name: query.lastname,
            username: query.username,
            password: query.password
        });

        responseData = {result: 'SUCCESS', message: 'New Account Created'};

    }
    res.json(responseData)

})

app.listen(port, () => console.log(`App is running on port ${port}`));
connect();