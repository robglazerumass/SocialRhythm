import { UserData, PostData, CommentData } from "../Database/models/DB_Schemas.js";
import { BackendErrorType } from "./BackendError.js";

// This file contains the functions that handle posts, feed, comments, likes, and other related post functionality

/**
 * Retrieves a list of posts for the user's feed based on the provided parameters.
 * 
 * @param {string} username - The username of the user.
 * @param {number} xPosts - The number of posts per page.
 * @param {number} pageNum - The page number (starting from 0).
 * @returns {Array} - An array of post objects sorted by most recent.
 * @throws {BackendErrorType} - Throws an error if the user does not exist, if the page number is invalid, or if the feed is empty.
 */
export async function feed(username, xPosts, pageNum) {
    let user = await UserData.findOne({ username: username })

    if (user === null || user === undefined)
        throw BackendErrorType.USER_DNE

    if (pageNum < 0)
        throw BackendErrorType.INVALID_FEED_PAGE

    const followingList = user.user_following_list

    if (followingList === undefined || followingList.length === 0)
        throw BackendErrorType.FEED_DNE

    // sorted by most recent
    let result = await PostData.find({ $or: followingList.map(x => { return { "username": x } }) })
        .sort({ date_created: -1 })
        .skip(pageNum * xPosts)
        .limit(xPosts)

    // Front-End just wanted us to return the JSON directly to them
    return result
}

/**
 * Creates a new post based on the provided information.
 * 
 * @param {string} username - The username of the user.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the post.
 * @param {string} spotify_link - The Spotify link for the post.
 * @param {string} image_url - The image URL for the post.
 * @returns {JSON} - An object containing a success message if the post was created successfully.
 * @throws {BackendErrorType} - Throws an error if there's an error during post creation.
 */
export async function createPost(username, title, description, spotify_link, image_url) {
    if (!title || !description)
        throw BackendErrorType.NO_TITLE_OR_DESC;

    let user = await UserData.findOne({ username: username });

    if (user == null)
        throw BackendErrorType.USER_DNE;

    const post = await PostData.create({
        username: username,
        title: title,
        description: description,
        spotify_link: spotify_link || '',
        image_url: image_url || '',
        likes_list: [],
        dislikes_list: [],
        comments_list: [],
        date_created: new Date(),
    });

    user.user_post_list.push(post._id);
    await user.save();

    return { result: 'SUCCESS', message: 'New Post Created' };
}

/**
 * Deletes a post with the provided postId.
 * 
 * @param {string} postId - The ID of the post to delete.
 * @returns {JSON} - An object containing a success message if the post is deleted successfully.
 * @throws {BackendErrorType} - Throws an error if the post does not exist or if there's an error during deletion.
*/
export async function deletePost(postId) {
    const post = await PostData.findOne({ _id: postId });

    if (!post) {
        throw BackendErrorType.POST_DNE;
    }

    const user = await UserData.findOne({ username: post.username });

    if (!user) {
        throw BackendErrorType.USER_DNE;
    }

    // Remove the post from the user's post list
    user.user_post_list.pull(postId);
    await user.save();

    // Delete the comments associated with the post
    await CommentData.deleteMany({ post_id: postId });

    // Delete the post
    await PostData.deleteOne({ _id: postId });

    let result = { message: `Post with ID ${postId} has been deleted` };

    return result;
}

/**
 * Takes in a request with above fields and adds or removes a like or dislike from 
 * a post or comment.
 * 
 * @param {string} requestType - Specifies adding or removing a rating using "add" or "remove"
 * @param {string} ratingType - Specifies the rating type using either "like" or "dislike"
 * @param {string} username - Specifies the username of the user who is making the rating
 * @param {string} destId - Specifies the "_id" of the post or comment that rating should be added to
 * @returns {Object | BackendErrorType} Returns either JSON declaring success or throws a BackendError on failure 
 * @throws {BackendErrorType} - Throws an error if the request is invalid or if the rating is invalid
 */
export async function rating(requestType, ratingType, username, destId) {
    let result, user, dest, likes, dislikes;
    user = await UserData.findOne({ username: username });

    if (user == null)
        throw BackendErrorType.USER_DNE;

    try {
        dest = await PostData.findOne({ _id: destId });
    }
    catch (error) {
        throw BackendErrorType.POST_DNE;
    }

    if (dest == null) {
        try {
            dest = await CommentData.findOne({ _id: destId });
        }
        catch (error) {
            throw BackendErrorType.COMMENT_DNE;
        }

        if (dest == null) {
            throw BackendErrorType.POST_COMMENT_DNE;
        }
        else {
            likes = dest.comment_like_list;
            dislikes = dest.comment_dislike_list;
        }
    }
    else {
        likes = dest.likes_list;
        dislikes = dest.dislikes_list;
    }

    if (requestType == "add") {
        if (ratingType == "like" && !(likes.includes(user.username) || dislikes.includes(user.username))) {
            likes.push(user.username);
            await dest.save();
        }
        else if (ratingType == "dislike" && !(likes.includes(user.username) || dislikes.includes(user.username))) {
            dislikes.push(user.username);
            await dest.save();
        }
        else {
            throw BackendErrorType.INVALID_RATINGTYPE;
        }
    }
    else if (requestType == "remove") {
        if (ratingType == "like" && likes.includes(user.username)) {
            likes.pull(user.username);
            await dest.save();
        }
        else if (ratingType == "dislike" && dislikes.includes(user.username)) {
            dislikes.pull(user.username);
            await dest.save();
        }
        else {
            throw BackendErrorType.INVALID_RATINGTYPE;
        }
    }
    else {
        throw BackendErrorType.INVALID_REQUESTTYPE;
    }

    result = { result: 'SUCCESS' };

    return result;

}


/**
 * Creates a new comment on a post specified by the provided postId.
 * 
 * @param {string} username - The username of the user creating the comment.
 * @param {string} postId - The ID of the post on which the comment is being created.
 * @param {string} commentString - The content of the comment.
 * @returns {Object} - An object indicating the success of the comment creation.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid, if the user or post does not exist,
 *                              or if there's an error during comment creation.
*/
export async function createComment(username, postId, commentString) {
    // get the user
    let user = await UserData.findOne({ username: username })

    if (user === null || user === undefined)
        throw BackendErrorType.USER_DNE

    // get the post
    let post = await PostData.findOne({ _id: postId })

    if (post === null || post === undefined)
        throw BackendErrorType.POST_DNE

    // create a new comment
    let comment = await CommentData.create({
        post_id: postId,
        username: username,
        comment_string: commentString,
        comment_like_list: [],
        comment_dislike_list: [],
        date_created: new Date(),
    })

    // add comment to post
    post.comments_list.push(comment._id)
    await post.save()

    return { result: 'SUCCESS', message: 'New Comment Created' }
}

/**
 * Retrieves the comments associated with the specified post.
 * 
 * @param {string} postId - The ID of the post for which comments are to be retrieved.
 * @returns {Array} - An array containing the comments associated with the specified post.
 * @throws {BackendErrorType} - Throws an error if the provided query is invalid or if the post does not exist.
 */
export async function getComments(postId) {
    let post = await PostData.findOne({ _id: postId })

    if (post === null || post === undefined)
        throw BackendErrorType.POST_DNE

    let comments = await CommentData.find({ post_id: postId })
        .sort({ date_created: 1 })

    return comments
}
