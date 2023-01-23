import { useEffect, useState } from "react";

export function useFetch(fetchData) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData()
            .then((result) => {
                console.log(result);
                setData(result);
                setIsLoading(false);
            })
            .catch((err) => setError(err));
    }, [fetchData]);

    return { isLoading, data, error };
}
