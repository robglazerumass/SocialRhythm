import { UserData, PostData, CommentData } from "../Database/models/DB_Schemas.js";
import { BackendErrorType } from "./BackendError.js";

// This file contains the functions that handles interactions with users, such as searching for users, 
// following users, viewing profiles, and other related user functionality


/**
 * Retrieves the profile of the user with the provided username, along with their associated posts.
 * 
 * @param {string} username - The username of the user whose profile to retrieve.
 * @returns {Object} - An object containing the user's profile information and their associated posts.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid or if the user does not exist.
 */
export async function profile(username) {
    let user = await UserData.findOne({ username: username })

    if (user === null || user === undefined)
        throw BackendErrorType.USER_DNE

    // need to return a JSON with user profile information along with the list of posts by this user

    let postList = await PostData.find({ username: username })

    let result = {
        user_first_name: user["user_first_name"],
        user_last_name: user["user_last_name"],
        user_email: user["user_email"],
        username: user["username"],
        user_bio: user["user_bio"],
        user_following_list: user["user_following_list"],
        user_follower_list: user["user_follower_list"],
        user_post_list: postList,
    }
    return result
}

/**
 * User with the provided username follows the user with the provided userToFollow.
 * 
 * @param {string} username - The username of the user.
 * @param {string} userToFollow - The username of the user to follow.
 * @returns {JSON} - An object containing a success message if the user is now following the target user.
 * @throws {BackendErrorType} - Throws an error if the user does not exist, if the target user does not exist, 
 *                              if the user is already following the target user, or if the user tries to follow themselves.
*/
export async function follow(username, userToFollow) {

    if (username === userToFollow) {
        throw BackendErrorType.SELF_FOLLOW;
    }

    const user = await UserData.findOne({ username: username });
    const targetUser = await UserData.findOne({ username: userToFollow });

    if (!user || !targetUser) {
        throw BackendErrorType.USER_DNE;
    }

    if (user.user_following_list.includes(userToFollow)) {
        throw BackendErrorType.ALREADY_FOLLOWING;
    }

    user.user_following_list.push(userToFollow);
    await user.save();

    targetUser.user_follower_list.push(username);
    await targetUser.save();

    let result = { message: `You are now following ${userToFollow}` };

    return result;
}

/**
 * User with the provided username unfollows the user with the provided userToUnfollow.
 * 
 * @param {string} username - The username of the user.
 * @param {string} userToUnfollow - The username of the user to unfollow.
 * @returns {JSON} - An object containing a success message if the user has unfollowed the target user.
 * @throws {BackendErrorType} - Throws an error if the user does not exist, if the target user does not exist, 
 *                              if the user is not following the target user, or if the user tries to unfollow themselves.
*/
export async function unfollow(username, userToUnfollow) {
    if (username === userToUnfollow) {
        throw BackendErrorType.SELF_UNFOLLOW;
    }

    const user = await UserData.findOne({ username: username });
    const targetUser = await UserData.findOne({ username: userToUnfollow });

    if (!user || !targetUser) {
        throw BackendErrorType.USER_DNE;
    }

    if (!user.user_following_list.includes(userToUnfollow)) {
        throw BackendErrorType.NOT_FOLLOWING;
    }

    user.user_following_list.pull(userToUnfollow);
    await user.save();

    targetUser.user_follower_list.pull(username);
    await targetUser.save();

    let result = { message: `You have unfollowed ${userToUnfollow}` };

    return result;
}

/**
 * Searches for users based on the provided search term.
 * takes in a query with above field and returns an array of JSON results or throws a Backend Error
 * The following endpoint recieves a searchTerm related to a user and queries the database using
 * autocomplete, along with fuzzy search, to find similar results, weighing them on accuracy,
 * and the type of category the searchTerm may be in (user_first_name || username || user_last_name)
 * 
 * @param {string} searchTerm - The search term to use when searching for users.
 * @returns {Array} - An array containing the users that match the search term.
 * @throws {BackendErrorType} - Throws an error if the search term is empty or if no users are found.
*/
export async function search(searchTerm) {
    if (searchTerm == '') {
        throw BackendErrorType.USER_NOT_FOUND;
    }

    let pipeline = [{
        $search: {
            index: "autoCompleteUsers",
            compound: {
                should: [{
                    phrase: {
                        query: searchTerm,
                        path: "user_first_name",
                        score: { boost: { value: 10 } } /// <--- Score boosting on exact match
                    }
                },
                {
                    autocomplete: {
                        query: searchTerm,
                        path: "user_first_name",
                        fuzzy: { "prefixLength": 2 }, /// <--- The first two letters must match
                        score: { boost: { value: 10 } }
                    }
                },
                {
                    phrase: {
                        query: searchTerm,
                        path: "username",
                        score: { boost: { value: 10 } } /// <--- Score boosting on exact match
                    }
                },
                {
                    autocomplete: {
                        query: searchTerm,
                        path: "username",
                        fuzzy: { "prefixLength": 2 }, /// <--- The first two letters must match
                        score: { boost: { value: 5 } }
                    }
                },
                {
                    phrase: {
                        query: searchTerm,
                        path: "user_last_name",
                        score: { boost: { value: 10 } } /// <--- Score boosting on exact match
                    }
                },
                {
                    autocomplete: {
                        query: searchTerm,
                        path: "user_last_name",
                        fuzzy: { "prefixLength": 2 }, /// <--- The first two letters must match
                        score: { boost: { value: 2 } }
                    }
                }
                ]
            }
        }
    },
    {
        $limit: 20 /// <--- Limit the result array to 20
    },
    {
        $project: { /// <--- Extract only the following infromation from each result to return
            _id: 1,
            user_first_name: 1,
            user_last_name: 1,
            username: 1,
        }
    }
    ];

    let result = await UserData.aggregate(pipeline);

    if (result == 0) {
        throw BackendErrorType.USER_NOT_FOUND;
    }

    return result;
}

