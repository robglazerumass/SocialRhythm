/**
 * Error class that includes a status code (int) and message (string).
 * 
 * if (something_went_wrong)
 *      throw new BackendError(101, "Something went wrong!"),
 */
class BackendError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

/**
 * List of backend error types.
 * 
 * @example
 * INVALID_LOGIN: new BackendError(701, "Username or password incorrect."),
 * INVALID_EMAIL: new BackendError(703, "Invalid email."),
 * USERNAME_EXISTS: new BackendError(704, "This username already exists."),
 * INVALID_QUERY: new BackendError(705, "Invalid query fields."),
 * SELF_FOLLOW: new BackendError(706, "Cannot follow yourself."),
 * ALREADY_FOLLOWING: new BackendError(708, "Already following this user."),
 * MISSING_FIELDS: new BackendError(709, "Your post is missing neccesary fields"),
 * FEED_DNE: new BackendError(710, "Feed Does Not Exist."),
 * USER_DNE: new BackendError(711, "User Does Not Exist."),
 * INVALID_FEED_PAGE: new BackendError(712, "This is an invalid page number for feed."),
 * NO_TITLE_OR_DESC: new BackendError(713, "Your post is missing a title and/or a description"),
 * USER_NOT_FOUND: new BackendError(714, "User was not found."),
 * POST_DNE: new BackendError(715, "Post Does Not Exist."),
 * COMMENT_DNE: new BackendError(716, "Comment Does Not Exist."),
 * POST_COMMENT_DNE: new BackendError(717, "Comment or Post Does Not Exist."),
 * INVALID_RATINGTYPE: new BackendError(718, "Invalid Rating Type."),
 * INVALID_REQUESTTYPE: new BackendError(719, "Invalid Rating Type.")
 */
export const BackendErrorType = Object.freeze({
    INVALID_LOGIN: new BackendError(701, "Username or password incorrect."),
    INVALID_EMAIL: new BackendError(703, "Invalid email."),
    USERNAME_EXISTS: new BackendError(704, "This username already exists."),
    INVALID_QUERY: new BackendError(705, "Invalid query fields."),
    SELF_FOLLOW: new BackendError(706, "Cannot follow yourself."),
    ALREADY_FOLLOWING: new BackendError(708, "Already following this user."),
    MISSING_FIELDS: new BackendError(709, "Your post is missing neccesary fields"),
    FEED_DNE: new BackendError(710, "Feed Does Not Exist."),
    USER_DNE: new BackendError(711, "User Does Not Exist."),
    INVALID_FEED_PAGE: new BackendError(712, "This is an invalid page number for feed."),
    NO_TITLE_OR_DESC: new BackendError(713, "Your post is missing a title and/or a description"),
    USER_NOT_FOUND: new BackendError(714, "User was not found."),
    POST_DNE: new BackendError(715, "Post Does Not Exist."),
    COMMENT_DNE: new BackendError(716, "Comment Does Not Exist."),
    POST_COMMENT_DNE: new BackendError(717, "Comment or Post Does Not Exist."),
    INVALID_RATINGTYPE: new BackendError(718, "Invalid Rating Type."),
    INVALID_REQUESTTYPE: new BackendError(719, "Invalid Rating Type."),
    SELF_UNFOLLOW: new BackendError(720, "Cannot unfollow yourself."),
    NOT_FOLLOWING: new BackendError(721, "You are not following this user.")
});
