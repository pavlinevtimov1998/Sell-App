import * as apiService from './apiService';

const endpoints = {
    getLast: "/products?limit=16",
};

export const getLastProducts = () => apiService.getRequest(endpoints.getLast);
