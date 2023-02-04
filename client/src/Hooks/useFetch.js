import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorContext } from "../Contexts/ErrorContext";

export function useFetch(fetchData, deps = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useContext(ErrorContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
            .then((result) => {
                if (result) {
                    setData(result);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError((state) => ({
                    hasError: true,
                    message: error.message,
                }));
                setIsLoading(false);
                navigate("/404", { replace: true });
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setError, ...deps]);

    return { isLoading, setIsLoading, data };
}
