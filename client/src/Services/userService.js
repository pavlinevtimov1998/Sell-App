import * as apiService from "./apiService";

const endpoints = {
    userData: "/auth/user-data",
    login: "/auth/login",
};

export const initialRequest = () => apiService.getRequest(endpoints.userData);

export const login = (data) => apiService.postRequest(endpoints.login, data);
