import * as apiService from "./apiService";

const endpoints = {
    login: "/auth/login",
};

export const login = (data) => apiService.postRequest(endpoints.login, data);
