import * as apiService from "./apiService";

const endpoints = {
    login: "/auth/login",
    logout: "/auth/logout",
};

export const login = (data) => apiService.postRequest(endpoints.login, data);

export const logout = () => apiService.getRequest(endpoints.logout);
