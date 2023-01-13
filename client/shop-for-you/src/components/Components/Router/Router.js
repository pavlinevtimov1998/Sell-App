import { Route, Routes } from "react-router-dom";

import { SubcategoriesPage } from "../../Pages/SubcategoriesPage/SubcategoriesPage";
import { HomePage } from "../../Pages/HomePage/HomePage";
import { AuthPage } from "../../Pages/AuthPage/AuthPage";
import { CartPage } from "../../Pages/CartPage/CartPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/categories/:categoryId"
                element={<SubcategoriesPage />}
            />

            <Route path="/login" element={<AuthPage isRegister={false} />} />
            <Route path="/register" element={<AuthPage isRegister={true} />} />

            <Route path="/cart" element={<CartPage />} />
        </Routes>
    );
};
