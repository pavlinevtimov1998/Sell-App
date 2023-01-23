import * as apiService from "./apiService";

const endpoinds = {
    getAllCategories: "/categories",
};

export const getAll = () => apiService.getRequest(endpoinds.getAllCategories);
