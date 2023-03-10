import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorContext } from "../Contexts/ErrorContext";

export function useFetch(fetchData, deps = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setMessage } = useContext(ErrorContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetchData()
            .then((result) => {
                if (result) {
                    setData(result);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setMessage({
                    message: error.message,
                    hasError: true,
                    hasMessage: true,
                });
                setIsLoading(false);
                navigate("/404", { replace: true });
            });
        console.log("from fetch");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { isLoading, setIsLoading, data, setData };
}
