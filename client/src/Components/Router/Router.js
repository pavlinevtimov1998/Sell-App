import { Route, Routes } from "react-router-dom";

import { HomePage } from "../Pages/HomePage/HomePage";

export const AppRouter = () => {
    return (
        <Routes>

            <Route element={<HomePage />} path="/" />
            
        </Routes>
    );
};
