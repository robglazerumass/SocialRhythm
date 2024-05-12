import { UserData, PostData, CommentData } from "../Database/models/DB_Schemas.js";
import { BackendErrorType } from "./BackendError.js";

// This file contains the functions that handle user account creation and login.

/**
 * Retrieves user account information based on the provided username and password.
 * 
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {JSON} - An object containing the result of the login operation and user account information.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid or if the login credentials are incorrect.
 */
export async function login(username, password) {
    let result = await UserData.findOne({ username: username, password: password });

    if (result == null)
        throw BackendErrorType.INVALID_LOGIN;

    return { result: 'SUCCESS', account_info: result._id };
}

/**
 * Creates a new user account based on the provided information.
 * 
 * @param {string} firstname - The first name of the user.
 * @param {string} lastname - The last name of the user.
 * @param {string} username - The desired username for the new account.
 * @param {string} password - The password for the new account.
 * @param {string} email - The email address of the user.
 * @returns {Object} - An object containing the result of the signup operation and a success message if successful.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid, if the username already exists,
 *                              or if there's an error during user creation.

 */
export async function signup(firstname, lastname, username, password, email) {
    let result = await UserData.findOne({ username: username })

    if (result != null)
        throw BackendErrorType.USERNAME_EXISTS;

    // create a new user
    const user = await UserData.create({
        user_first_name: firstname,
        user_last_name: lastname,
        user_email: email,
        username: username,
        password: password,
        user_bio: "",
        user_following_list: [],
        user_follower_list: [],
        user_post_list: [],
        date_created: new Date(),
    });

    return { result: 'SUCCESS', message: 'New Account Created' };
}