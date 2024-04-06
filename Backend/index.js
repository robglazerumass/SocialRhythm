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
        let responseData;
        let result = await UserData.findOne({ username: req.query.name });

        if (result == null) throw BackendErrorType.USERNAME_NOT_EXISTS;

        result = await UserData.find({ username: req.query.name, password: req.query.pass });

        if (result.length == 0) throw BackendErrorType.INCORRECT_PASSWORD;

        responseData = { result: 'SUCCESS', account_info: result[0]._id };
        res.json(responseData);
    } catch(error) {
        next(error);
    }
});

// Handles errors thrown to Express
app.use((error, req, res, next) => {
    const msg = error.message !== undefined ? error.message : "Something went wrong.";
    const status = error.status !== undefined ? error.status : 700;
    console.error(error);
    res.status(status).send(msg);
});

app.listen(port, () => console.log(`App is running on port ${port}`));
connect();