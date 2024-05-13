import { feed } from "../src/posts";
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

describe("Feed Display function", () => {
    it("Test API integration", async () => {
        const response = await getRequest("/feed", {
            username: "alice123",
            xPosts: 5,
            pageNum: 0,
        });
        expect(response).not.toEqual(undefined)
        expect(response.length).toBeLessThanOrEqual(5);
        

    });

    it("Test Helper Function", async () => {
        const response = await feed("alice123", 5, 0);
        expect(response).not.toEqual(undefined)
        expect(response.length).toBeLessThanOrEqual(5);
    });

    it("Test Invalid User", async () => {
        try {
            await feed("invalidUser", 5, 0);
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USER_DNE);
        }
    });

    it("Page Number Cannot Be Negative", async () => {
        try {
            await feed("alice123", 5, -1);
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_FEED_PAGE);
        }
    });

    it("Post Count Cannot Be Negative", async () => {
        try {
            await feed("alice123", -1, 0);
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_FEED_PAGE);
        }
    });

    it("Post Count Can Be Zero", async () => {
        try {
            await feed("alice123", 0, 0);
            
        } catch (e) {
            throw new Error("Should Not Reach Here");
        }
    });

    it("Post Count Can Be Very High", async () => {
        const response = await feed("alice123", 101, 0);  

        expect(response).not.toEqual(undefined)
        expect(response.length).toBeLessThanOrEqual(101);   
            
    });
    it("Page Count Can Be Very High", async () => {
        const response = await feed("alice123", 5, 101);  

        expect(response).not.toEqual(undefined)
        // There should be nothing on this page
        expect(response.length).toBeLessThanOrEqual(0);
    });

});
