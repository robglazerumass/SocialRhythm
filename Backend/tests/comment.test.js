import { getComments, createComment } from "../src/posts";
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

describe("createComment Function", () => {
    it("Test API integration", async () => {
        const response = await postRequest("/createComment", {
            username: "alice123",
            postId: "6629b52321a4e8bba1adc12a",
            commentString: "This is a test comment"
        });
        expect(response).not.toEqual(undefined);
        expect(response.result).toEqual("SUCCESS");
    });

    it("Test Helper Function", async () => {
        const response = await createComment("alice123", "6629b52321a4e8bba1adc12a", "This is a test comment");
        expect(response).not.toEqual(undefined);
        expect(response.result).toEqual("SUCCESS");
    });

    it("Test Invalid User", async () => {
        try {
            await createComment("invalidUser", "6629b52321a4e8bba1adc12a", "This is a test comment");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USER_DNE);
        }
    });

    it("Test Invalid Post", async () => {
        try {
            await createComment("alice123", "6629b52321a4e8bba1adc13d", "This is a test comment");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.POST_DNE);
        }
    });

    it("Test Comment Creation", async() => {
        const response = await createComment("alice123", "6629b52321a4e8bba1adc12a", "This is a test comment");
        // check the comments on that post
        const comments = await getComments("6629b52321a4e8bba1adc12a");
        expect(comments).not.toEqual(undefined);
        expect(comments.length).toBeGreaterThan(0);

        // check the comment content
        const comment = comments[comments.length - 1];
        expect(comment).toHaveProperty("username");
        expect(comment).toHaveProperty("comment_string");
        expect(comment).toHaveProperty("comment_like_list");
        expect(comment).toHaveProperty("comment_dislike_list");
        expect(comment).toHaveProperty("date_created");

        // check the comment content
        expect(comment.username).toEqual("alice123");
        expect(comment.comment_string).toEqual("This is a test comment");
    });

    it("Should Properly Handle If Id cannot be converted to ObjectId (Slightly Wrong)", async () => {
        try {
            await createComment("alice123", "invalidId", "This is a test comment");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.POST_DNE);
        }
    });

    it("Should Properly Handle If Id cannot be converted to ObjectId (Completely Wrong)", async () => {
        try {
            await createComment("alice123", "invalidId", "This is a test comment");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.POST_DNE);
        }
    });


});

describe("getComments Function", () => {
    it("Test API integration", async () => {
        const response = await getRequest("/getComments", {
            postId: "6629b52321a4e8bba1adc12a"
        });
        expect(response).not.toEqual(undefined);
        expect(response.length).toBeGreaterThan(0);
    });

    it("Test Helper Function", async () => {
        const response = await getComments("6629b52321a4e8bba1adc12a");
        expect(response).not.toEqual(undefined);
        expect(response.length).toBeGreaterThan(0);
    });

    it("Test Invalid Post", async () => {
        try {
            await getComments("6629b52321a4e8bba1adc13d");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.POST_DNE);
        }
    });

    it("Test Valid Post", async () => {
        const response = await getComments("6629b52321a4e8bba1adc12a");
        expect(response).not.toEqual(undefined);
        expect(response.length).toBeGreaterThan(0);
    });

    it("Test Empty Post", async () => {
        const response = await getComments("66417aec7d63165e0edd397c");
        expect(response).not.toEqual(undefined);
        expect(response.length).toEqual(0);
    });

    it("Should Properly Handle If Id cannot be converted to ObjectId (Slightly Wrong)", async () => {
        try {
            await getComments("invalidId");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.POST_DNE);
        }
    });

    it("Should Properly Handle If Id cannot be converted to ObjectId (Completely Wrong)", async () => {
        try {
            await getComments("invalidId");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.POST_DNE);
        }
    });

});