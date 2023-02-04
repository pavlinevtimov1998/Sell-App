import * as apiService from "./apiService";

const endpoints = {
    getLast: "/products?limit=16",
    getOne: (productId) => `/products/${productId}`,
    create: "/products",
    getTowns: (value) => `/products/towns?city=${value}`,
};

export const getLastProducts = () => apiService.getRequest(endpoints.getLast);

export const getOneProduct = (productId) =>
    apiService.getRequest(endpoints.getOne(productId));

export const createProduct = (data) =>
    apiService.postRequest(endpoints.create, data, true);

export const getTowns = (value) =>
    apiService.getRequest(endpoints.getTowns(value));
