import * as apiService from "./apiService";

const endpoints = {
    getLast: "/products?limit=16",
    withId: (productId) => `/products/${productId}`,
    create: "/products",
    getTowns: (value) => `/products/towns?city=${value}`,
    like: (productId) => `/products/like/${productId}`,
    removeLike: (productId) => `/products/remove-like/${productId}`,
};

export const getLastProducts = () => apiService.getRequest(endpoints.getLast);

export const getOneProduct = (productId) =>
    apiService.getRequest(endpoints.withId(productId));

export const createProduct = (data) =>
    apiService.postRequest(endpoints.create, data, true);

export const deleteProduct = (id) =>
    apiService.deleteRequest(endpoints.withId(id));

export const likeProduct = (id) => apiService.patchRequest(endpoints.like(id));

export const removeLike = (id) =>
    apiService.patchRequest(endpoints.removeLike(id));

export const getTowns = (value) =>
    apiService.getRequest(endpoints.getTowns(value));
