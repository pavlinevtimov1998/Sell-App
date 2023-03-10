import * as apiService from "./apiService";

const endpoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    thirdPartyAuth: "/auth/third-party-auth",
};

export const register = (data) =>
    apiService.postRequest(endpoints.register, data);

export const login = (data) => apiService.postRequest(endpoints.login, data);

export const logout = () => apiService.getRequest(endpoints.logout);

export const thirdPartyAuth = (data) =>
    apiService.postRequest(endpoints.thirdPartyAuth, data);
