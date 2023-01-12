import { Route, Routes } from "react-router-dom";

import { CategoriesPage } from "../Pages/CategoriesPage/CategoriesPage";
import { HomePage } from "../Pages/HomePage/HomePage";

export const Router = () => {
    return (
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
        
        </Routes>
    );
};
