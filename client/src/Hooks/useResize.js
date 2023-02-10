import { useEffect, useState } from "react";

export function useResize(num) {
    const [state, setState] = useState(window.innerWidth < num);

    useEffect(() => {
        const resizeHandler = (e) => {
            if (e.target.innerWidth > 600) {
                setState(false);
            } else {
                setState(true);
            }
        };

        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { state };
}
