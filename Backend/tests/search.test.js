import { search } from "../src/users";
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

describe("Search Function", () => {
    it("Test API integration", async () => {
        const response = await getRequest("/search", {
            searchTerm: "alice123"
        });
        expect(response).not.toEqual(undefined);
        expect(response[0].username).toEqual("alice123");
    });

    it("Test Invalid User", async () => {
        try {
            await search("invalidUser");
            throw new Error("Should Not Reach Here");
        } catch (e) {
            expect(e).toEqual(BackendErrorType.USER_NOT_FOUND);
        }
    });

    it("Test input with spaces", async () => {
        const response = await search("Alice Johnson");

        expect(response).not.toEqual(undefined)
        expect(response[0].username).toEqual("alice123");
         
    });

    it("Test input without spaces", async () => {
        const response = await search("AliceJohnson");

        expect(response).not.toEqual(undefined)
        expect(response[0].username).toEqual("alice123");
         
    });

    it("Test partial input / autocomplete", async () => {
        const response = await search("A");

        expect(response).not.toEqual(undefined)
        expect(response[0].username).toEqual("alice123");
        expect(response.length).toBeGreaterThan(1);
    });

    it("Test Fuzzy Search", async () => {
        const response = await search("Alecce");
    
        expect(response).not.toEqual(undefined)
        expect(response[0].username).toEqual("alice123");
    });

    it("Test Fuzzy Search Too many Mistakes", async () => {
        try{
            const response = await search("Aleccess");
        }
        catch(e){
            expect(e).toEqual(BackendErrorType.USER_NOT_FOUND);
        }
    });

});