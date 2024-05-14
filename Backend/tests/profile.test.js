import { profile } from "../src/users"; 
import { start, stop } from "../index";
import { getRequest } from "./utility";
import { BackendErrorType } from "../src/BackendError";
import { response } from "express";

beforeAll(async () => {
    await start();
});

afterAll(async () => {
    await stop();
});

describe("Profile Display function", () => {
    it("Test API integration", async () => {
        const response = await getRequest("/profile", {
            username: "alice123",
        });
        expect(response).not.toEqual(undefined);
        expect(response.username).toEqual("alice123");

    });

    it("Test Helper Function", async () => {
        const response = await profile("alice123");
        expect(response).not.toEqual(undefined)
        expect(response.username).toEqual("alice123");
    });

    it("Test Invalid User", async () => {
        try {
            await profile("invalidUser");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USER_DNE);
        }
    });

    it("Test User Profile", async () => {
        const response = await profile("alice123");
        expect(response).toHaveProperty("user_first_name");
        expect(response).toHaveProperty("user_last_name");
        expect(response).toHaveProperty("user_email");
        expect(response).toHaveProperty("username");
        expect(response).toHaveProperty("user_bio");
        expect(response).toHaveProperty("user_following_list");
        expect(response).toHaveProperty("user_follower_list");
        expect(response).toHaveProperty("user_post_list");
    });

    it("Test User Profile Information", async () => {
        const response = await profile("alice123");
        expect(response.user_first_name).toEqual("Alice");
        expect(response.user_last_name).toEqual("Johnson");
    });

    it("Should Not Display Password", async () => {
        const response = await profile("alice123");
        expect(response).not.toHaveProperty("password");
    });

    it("Should Not Display User ID", async () => {
        const response = await profile("alice123");
        expect(response).not.toHaveProperty("_id");
    });

    it("Should Display Different Profiles For Different Users", async () => {
        const response1 = await profile("alice123");
        const response2 = await profile("evag");
        expect(response1).not.toEqual(response2);
    });

});