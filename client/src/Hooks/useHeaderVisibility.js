import { useEffect, useState } from "react";

export function useHeaderVisibility() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        function handleScroll() {
            let prevScrollPosition = 0;

            return function inner() {
                const currentScrollPosition = window.pageYOffset;

                if (
                    currentScrollPosition < prevScrollPosition &&
                    currentScrollPosition > 150
                ) {
                    prevScrollPosition = currentScrollPosition;
                    setIsHeaderVisible(true);
                }

                if (
                    currentScrollPosition > prevScrollPosition &&
                    currentScrollPosition > 150
                ) {
                    prevScrollPosition = currentScrollPosition;
                    setIsHeaderVisible(false);
                }
            };
        }

        window.addEventListener("scroll", handleScroll());

        return () => window.removeEventListener("scroll", handleScroll());
    }, []);

    return { isHeaderVisible };
}
