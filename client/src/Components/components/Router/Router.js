import { Route, Routes } from "react-router-dom";

import { HomePage } from "../../Pages/HomePage/HomePage";
import { AuthPage } from "../../Pages/AuthPage/AuthPage";
import { Logout } from "../Logout/Logout";
import { DetailsPage } from "../../Pages/DetailsPage/DetailsPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<HomePage />} path="/" />

            <Route element={<DetailsPage />} path="/product/:productId" />

            <Route element={<AuthPage action={"login"} />} path="/login" />
            <Route
                element={<AuthPage action={"register"} />}
                path="/register"
            />
            <Route element={<Logout />} path="/logout" />
        </Routes>
    );
};
