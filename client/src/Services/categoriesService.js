import * as apiService from "./apiService";

const endpoinds = {
    getAllCategories: "/categories",
};

export const getAllCategories = () =>
    apiService.getRequest(endpoinds.getAllCategories);
