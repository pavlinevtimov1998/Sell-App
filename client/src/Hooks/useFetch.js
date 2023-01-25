import { useEffect, useState } from "react";

export function useFetch(fetchData, deps = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData()
            .then((result) => {
                setData(result);
                setIsLoading(false);
            })
            .catch((err) => setError(err));

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { isLoading, data, error };
}
