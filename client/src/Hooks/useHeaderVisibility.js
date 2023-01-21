import { useEffect, useState } from "react";

export function useHeaderVisibility() {
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            console.log(currentScrollPosition, prevScrollPosition);

            setPrevScrollPosition(currentScrollPosition);
            if (currentScrollPosition < prevScrollPosition) {
                setIsHeaderVisible(true);
            } else {
                setIsHeaderVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPosition]);

    return { isHeaderVisible };
}
