import { rating } from "../src/posts"; 
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

/*For the sake of not added a new rating everytime the tests are run we 
will only be testing functionality related to ensuring that the Rating 
Function catches and handles invalid cases as expected.
*/

describe("Rating function", () => {
    it("Test Invalid User", async () => {
        try {
            await rating("add", "like", "invalidUser", "6629b52421a4e8bba1adc13a");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USER_DNE);
        }
    });

    it("Test Invalid Request Type", async () => {
        try {
            await rating("invalidRequestType", "like", "alice123", "6629b52421a4e8bba1adc13a");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_REQUESTTYPE);
        }
    });

    it("Test Invalid Rating Type", async () => {
        try {
            await rating("add", "invalidRatingType", "alice123", "6629b52421a4e8bba1adc13a");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_RATINGTYPE);
        }
    });

    it("Test Invalid destID", async () => {
        try {
            await rating("add", "like", "alice123", "6629b52421a4e8bba1ad");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_DESTID);
        }
    });

    it("Test Missing Request Type", async () => {
        try {
            await rating(" ", "like", "alice123", "6629b52421a4e8bba1adc13a");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_REQUESTTYPE);
        }
    });

    it("Test Missing Rating Type", async () => {
        try {
            await rating("add", " ", "alice123", "6629b52421a4e8bba1adc13a");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_RATINGTYPE);
        }
    });

    it("Test Missing User", async () => {
        try {
            await rating("add", "like", " ", "6629b52421a4e8bba1adc13a");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USER_DNE);
        }
    });

    it("Test Missing ID", async () => {
        try {
            await rating("add", "like", "alice123", " ");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.INVALID_DESTID);
        }
    });

    it("Test Mixed Up Inputs", async () => {
        try {
            await rating("like", "add", "6629b52421a4e8bba1adc13a", "alice123");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USER_DNE);
        }
    });
});