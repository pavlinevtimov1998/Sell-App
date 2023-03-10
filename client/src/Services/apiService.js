const API_URL = "http://localhost:3030/api";

async function request(url, options) {
    try {
        const response = await fetch(`${API_URL}${url}`, options);

        if (!response.ok) {
            throw await response.json();
        }

        if (response.status === 204) {
            return {};
        }

        return await response.json();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function createOptions(method = "GET", data, isMultipart = false) {
    const options = {
        method,
        credentials: "include",
        headers: {},
    };

    if (isMultipart) {
        options["body"] = data;
    } else if (data && !isMultipart) {
        options.headers["Content-Type"] = "application/json";
        options["body"] = JSON.stringify(data);
    }

    return options;
}

export const getRequest = (url) => request(url, createOptions("GET"));

export const postRequest = (url, data, isMultipart) =>
    request(url, createOptions("POST", data, isMultipart));

export const patchRequest = (url, data) =>
    request(url, createOptions("PATCH", data));

export const deleteRequest = (url) => request(url, createOptions("DELETE"));
