import { Route, Routes } from "react-router-dom";
import { AuthPage } from "../../Pages/AuthPage/AuthPage";

import { HomePage } from "../../Pages/HomePage/HomePage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<HomePage />} path="/" />

            <Route element={<AuthPage action={"login"} />} path="/login" />
            <Route
                element={<AuthPage action={"register"} />}
                path="/register"
            />
        </Routes>
    );
};
