import { login, signup } from "../src/account";
import { start, stop } from "../index";
import { getRequest, postRequest } from "./utility";
import { BackendErrorType } from "../src/BackendError";
import { response } from "express";

beforeAll(async () => {
    await start();
});

afterAll(async () => {
    await stop();
});

describe("Test Login Function", () => {
    it("Test API integration", async () => {
        const response = await getRequest("/login", {
            username: "alice123",
            password: "securepassword"
        });
        expect(response).not.toEqual(undefined);
        expect(response.result).toEqual("SUCCESS");
    });

    it("Test Helper Function", async () => {
        const response = await login("alice123", "securepassword");
        expect(response).not.toEqual(undefined);
        expect(response.result).toEqual("SUCCESS");
    });

    it("Test Invalid User", async () => {
        try {
            await login("invalidUser", "securepassword");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_LOGIN);
        }
    });

    it("Test Invalid Password", async () => {
        try {
            await
            login("alice123", "wrongpassword");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_LOGIN);
        }
    });

});

describe("Test Signup Function", () => {
    it("Should Throw Error for Existing User", async () => {
        try {
            await signup("Alice", "Smith", "alice123", "securepassword", "testemail@gmail.com");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USERNAME_EXISTS);
        }
    });

    it("Should Throw Error Even If Name is Different", async () => {
        try {
            await signup("John", "Apples", "alice123", "securepassword", "testemail@gmail.com");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USERNAME_EXISTS);
        }
    });

    // For sake of time, we will not implement the tests for signing up with a user because that would require
    // functionality for deleting that user from the database directly after, which is not implemented just yet.

});