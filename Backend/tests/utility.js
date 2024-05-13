import fetch from "node-fetch";

/**
 * 
 * @param {string} endpoint The endpoint for the api.
 * Example,
 * ```
 * if apiUrlString="http://localhost:3000/api", endpoint="/login"
 * ==> urlString="http://localhost:3000/api/login"
 * ```
 * @param {JSON} parameters A JSON object containing parameters for the query.
 * Example,
 * ```
 * parameters = {
 *      username: "alice123",
 *      password: "securepassword"
 * }
 * ```
 * @param {JSON} [headers={}] A JSON object containing header information for the HTTP GET request.
 * @param {*} apiUrlString The URL string for the api. Default value is that running on localhost, `"http://localhost:3000/api"`
 */
export async function getRequest(endpoint, parameters, headers={}, apiUrlString="http://localhost:3000/api") {
    const urlString = apiUrlString + endpoint;
    const url = new URL(urlString);
    for (const paramName in parameters) {
        url.searchParams.append(paramName, parameters[paramName])
    }
    
    let response = await fetch(url.toString(), {
        method: "GET",
        headers: headers
    }).then(res => res.json())
    .catch(console.log);
    return response;
}

/**
 * 
 * @param {string} endpoint The endpoint for the api.
 * Example,
 * ```
 * if apiUrlString="http://localhost:3000/api", endpoint="/login"
 * ==> urlString="http://localhost:3000/api/login"
 * ```
 * @param {JSON} parameters A JSON object containing parameters for the query.
 * Example,
 * ```
 * parameters = {
 *      username: "alice123",
 *      password: "securepassword"
 * }
 * ```
 * @param {JSON} [headers={}] A JSON object containing header information for the HTTP POST request.
 * @param {*} apiUrlString The URL string for the api. Default value is that running on localhost, `"http://localhost:3000/api"`
 */
export async function postRequest(endpoint, parameters, headers={}, apiUrlString="http://localhost:3000/api") {
    const urlString = apiUrlString + endpoint;
    const url = new URL(urlString);
    for (const paramName in parameters) {
        url.searchParams.append(paramName, parameters[paramName])
    }

    let response = await fetch(url.toString(), {
        method: "POST",
        headers: headers
    }).then(res => res.json());
    return response;
}