import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";
import { ErrorContext } from "../../../Contexts/ErrorContext";

import { MainLayout } from "../Core/MainLayout/MainLayout";
import { MessageModal } from "../MessageModal/MessageModal";
import { AppRouter } from "../Router/Router";

export const MainWrapper = () => {
    const [message, setMessage] = useState({
        message: "",
        hasError: false,
        hasMessage: false,
    });
    const messageRef = useRef();
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let id;

        if (message.hasMessage) {
            messageRef.current.style.right = "40px";
            id = setInterval(() => {
                setMessage((state) => ({ ...state, hasMessage: false }));
            }, 5000);
        } else {
            messageRef.current.style.right = "-300px";
        }

        return () => clearInterval(id);
    }, [message.hasMessage]);

    useEffect(() => {
        if (
            message.hasMessage &&
            message.hasError &&
            message.message.includes("Token expired!")
        ) {
            handleLogout();
            navigate("/login", { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    return (
        <ErrorContext.Provider value={{ setMessage }}>
            <MainLayout>
                <MessageModal
                    message={message.message}
                    messageRef={messageRef}
                    hasError={message.hasError}
                />

                <AppRouter />
            </MainLayout>
        </ErrorContext.Provider>
    );
};
