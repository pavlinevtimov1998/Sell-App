import { useEffect, useState, useContext } from "react";

import { ErrorContext } from "../Contexts/ErrorContext";

export function useFetch(fetchData, deps = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useContext(ErrorContext);

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
            });
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setError, ...deps]);

    return { isLoading, data };
}
