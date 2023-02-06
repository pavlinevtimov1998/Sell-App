import { useEffect, useState } from "react";

export function useDropdown(time) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    useEffect(() => {
        let id;

        if (isMouseEnter) {
            setIsDropdownVisible(true);
        } else {
            id = setTimeout(() => {
                setIsDropdownVisible(false);
            }, time);
        }

        return () => clearTimeout(id);
    }, [isMouseEnter, time]);

    return { setIsMouseEnter, isDropdownVisible };
}
