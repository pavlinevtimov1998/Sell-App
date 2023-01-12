import { Route, Routes } from "react-router-dom";

import { SubcategoriesPage } from "../../Pages/SubcategoriesPage/SubcategoriesPage";
import { HomePage } from "../../Pages/HomePage/HomePage";

export const AppRouter = () => {
    return (
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route
                path="/categories/:categoryId"
                element={<SubcategoriesPage />}
            />

        </Routes>
    );
};
