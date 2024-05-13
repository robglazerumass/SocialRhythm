import { feed } from "../src/posts";
import { start, stop } from "../index";
import { getRequest } from "./utility";
import { BackendErrorType } from "../src/BackendError";

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

    it("Test Invalid Page Number", async () => {
        try {
            await feed("alice123", 5, -1);
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_FEED_PAGE);
        }
    });

    it("Test Invalid Post Count", async () => {
        try {
            await feed("alice123", -1, 0);
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_FEED_PAGE);
        }
    });

    it("Test Invalid Post Count", async () => {
        try {
            await feed("alice123", 0, 0);
            throw new Error("Should Not Reach Here");
        } catch (e) {

            expect(e).toEqual(BackendErrorType.INVALID_FEED_PAGE);
        }
    });

    it("Test Invalid Post Count", async () => {
        try {
            await feed("alice123", 101, 0);
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_FEED_PAGE);
        }
    });



});
