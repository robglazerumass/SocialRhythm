import express from "express";
import { connect } from './Database/MongoDBServer.js';
import { UserData } from "./Database/models/UserData.js";
import { BackendErrorType } from "./BackendError.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send({ worked: true });
});

app.get('/api/login', async (req, res, next) => {
    try {
        // TODO Fix the query names for name and password
        let result = await UserData.find({ username: req.query.name, password: req.query.pass });

        if (result.length == 0)
            throw BackendErrorType.INVALID_LOGIN;

        const responseData = { result: 'SUCCESS', account_info: result[0]._id };
        res.json(responseData);
    } catch (error) {
        next(error);
    }
});

app.get('/api/signup', async (req, res, next) => {
    try {
        let query = req.query
        // Check that username is unique
        let result = await UserData.find({ username: query.username })
        if (result.length > 0)
            throw BackendErrorType.USERNAME_EXISTS;
        // create a new user
        const user = await UserData.create({
            user_first_name: query.firstname,
            user_last_name: query.lastname,
            username: query.username,
            password: query.password
        });

        const responseData = { result: 'SUCCESS', message: 'New Account Created' };
        res.json(responseData);
    } catch (error) {
        next(error);
    }
})

// Handles errors thrown to Express
app.use((error, req, res, next) => {
    const msg = error.message !== undefined ? error.message : "Something went wrong.";
    const status = error.status !== undefined ? error.status : 700;
    console.error(error);
    res.status(status).send(msg);
});

app.listen(port, () => console.log(`App is running on port ${port}`));
connect();