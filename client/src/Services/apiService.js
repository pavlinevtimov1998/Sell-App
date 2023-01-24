const API_URL = "http://localhost:3030/api";

async function request(url, options) {
    const response = await fetch(`${API_URL}${url}`, options);

    if (!response.ok) {
        if (response.status === 401) {
            const result = await response.json();

            throw result;
        }
    }

    return response.json();
}

function createOptions(method = "GET", data) {
    const options = {
        method,
        credentials: "include",
        headers: {},
    };

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options["body"] = JSON.stringify(data);
    }

    return options;
}

export const getRequest = (url) => request(url, createOptions("GET"));

export const postRequest = (url, data) =>
    request(url, createOptions("POST", data));

export const patchRequest = (url, data) =>
    request(url, createOptions("PATCH", data));

export const deleteRequest = (url) => request(url, createOptions("DELETE"));
