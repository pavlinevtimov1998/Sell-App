import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";
import { ErrorContext } from "../../../Contexts/ErrorContext";

import { MainLayout } from "../Core/MainLayout/MainLayout";
import { MessageModal } from "../MessageModal/MessageModal";
import { AppRouter } from "../Router/Router";

export const MainWrapper = () => {
    const [error, setError] = useState({ message: "", hasError: false });
    const [message, setMessage] = useState({ message: "", hasMessage: false });
    const messageRef = useRef();
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let id;

        if (error.hasError) {
            messageRef.current.style.right = "40px";
            id = setInterval(() => {
                setError((state) => ({ ...state, hasError: false }));
            }, 5000);
        } else if (message.hasMessage) {
            messageRef.current.style.right = "40px";
            id = setInterval(() => {
                setMessage((state) => ({ ...state, hasMessage: false }));
            }, 5000);
        } else {
            messageRef.current.style.right = "-300px";
        }

        return () => clearInterval(id);
    }, [error.hasError, message.hasMessage]);

    useEffect(() => {
        if (error.hasError && error.message.includes("Token expired!")) {
            handleLogout();
            navigate("/login", { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <ErrorContext.Provider value={{ setError, setMessage }}>
            <MainLayout>
                <MessageModal
                    message={error.hasError ? error.message : message.message}
                    messageRef={messageRef}
                    hasError={error.hasError}
                />

                <AppRouter />
            </MainLayout>
        </ErrorContext.Provider>
    );
};
