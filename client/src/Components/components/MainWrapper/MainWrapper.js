import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";
import { ErrorContext } from "../../../Contexts/ErrorContext";

import { MainLayout } from "../Core/MainLayout/MainLayout";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { AppRouter } from "../Router/Router";

export const MainWrapper = () => {
    const [error, setError] = useState({ message: "", hasError: false });
    const errorRef = useRef();
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let id;

        if (error.hasError) {
            errorRef.current.style.right = "40px";
            id = setInterval(() => {
                setError((state) => ({ ...state, hasError: false }));
            }, 5000);
        } else {
            errorRef.current.style.right = "-300px";
        }

        return () => clearInterval(id);
    }, [error]);

    useEffect(() => {
        if (error.hasError && error.message.includes("Token expired!")) {
            handleLogout();
            navigate("/login", { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <ErrorContext.Provider value={{ setError }}>
            <MainLayout>
                <ErrorMessage message={error.message} errorRef={errorRef} />

                <AppRouter />

            </MainLayout>
        </ErrorContext.Provider>
    );
};
