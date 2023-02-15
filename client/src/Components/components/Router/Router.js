import { Route, Routes } from "react-router-dom";

import { HomePage } from "../../Pages/HomePage/HomePage";
import { AuthPage } from "../../Pages/AuthPage/AuthPage";
import { Logout } from "../Logout/Logout";
import { DetailsPage } from "../../Pages/DetailsPage/DetailsPage";
import { ProductActionPage } from "../../Pages/ProductActionPage/ProductActionPage";
import { ErrorPage } from "../../Pages/ErrorPage/ErrorPage";
import { ListingPage } from "../../Pages/ListingPage/ListingPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<HomePage />} path="/" />

            <Route element={<DetailsPage />} path="/details/:productId" />

            <Route
                element={<ProductActionPage action="create" />}
                path="/create-product"
            />
            <Route
                element={<ListingPage />}
                path="/listing"
            />

            <Route element={<AuthPage action={"login"} />} path="/login" />
            <Route
                element={<AuthPage action={"register"} />}
                path="/register"
            />
            <Route element={<Logout />} path="/logout" />

            <Route element={<ErrorPage />} path="*" />
        </Routes>
    );
};
