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
    USERNAME_NOT_EXISTS: new BackendError(701, "This username does not exist."),
    INCORRECT_PASSWORD: new BackendError(702, "Incorrect password."),
    INVALID_EMAIL: new BackendError(703, "Invalid email."),
    USERNAME_EXISTS: new BackendError(704, "This username already exists."),
});