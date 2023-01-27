import { useEffect, useRef, useState } from "react";
import { ErrorContext } from "../../../Contexts/ErrorContext";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { AppRouter } from "../Router/Router";

export const MainWrapper = () => {
    const [error, setError] = useState({ message: "", hasError: false });
    const errorRef = useRef();

    useEffect(() => {
        let id;

        if (error.hasError) {
            errorRef.current.style.right = "40px";
            id = setInterval(() => {
                setError((state) => ({ ...state, hasError: false }));
            }, 5000);
        } else {
            errorRef.current.style.right = "-300px";
            id && clearInterval(id);
        }
    }, [error]);

    return (
        <ErrorContext.Provider value={{ setError }}>
            <ErrorMessage message={error.message} errorRef={errorRef} />
            <AppRouter />;
        </ErrorContext.Provider>
    );
};
