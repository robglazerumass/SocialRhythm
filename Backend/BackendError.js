/**
 * Error class that includes a status code (int) and message (string).
 */
class BackendError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

/**
 * List of backend error types.
 */
export const BackendErrorType = Object.freeze({
    INVALID_LOGIN: new BackendError(701, "Username or password incorrect."),
    INVALID_EMAIL: new BackendError(703, "Invalid email."),
    USERNAME_EXISTS: new BackendError(704, "This username already exists."),
    INVALID_QUERY: new BackendError(705, "Invalid query fields."),
    SELF_ADD: new BackendError(706, "Cannot add yourself as a friend."),
    FRIEND_NOT_FOUND: new BackendError(707, "Friend not found."),
    ALREADY_FRIENDS: new BackendError(708, "Already friends with this user."),
    FEED_DNE: new BackendError(709, "Feed Does Not Exist."),
    USER_DNE: new BackendError(710, "User Does Not Exist."),
    INVALID_FEED_PAGE: new BackendError(711, "This is an invalid page number for feed."),
});
