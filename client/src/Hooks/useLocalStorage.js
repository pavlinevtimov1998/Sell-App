import { useState } from "react";

const KEY = "user";

export const useLocalStorage = () => {
    const [userData, setUserData] = useState(() => {
        const userData = localStorage.getItem(KEY);

        return userData ? JSON.parse(userData) : null;
    });

    const addUserData = (data) => {
        localStorage.setItem(KEY, JSON.stringify(data));

        setUserData(data);
    };

    const removeUserData = () => {
        localStorage.removeItem(KEY);
        setUserData(null);
        console.log(userData);
    };

    return { userData, addUserData, removeUserData };
};
