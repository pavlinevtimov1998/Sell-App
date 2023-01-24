import { useState } from "react";

export const useLocalStorage = () => {
    const [userData, setUserData] = useState(() => {
        const userData = localStorage.getItem("user");

        return userData ? JSON.parse(userData) : null;
    });

    const addUserData = (data) => setUserData(data);

    const removeUserData = (data) => setUserData(null);

    return { userData, addUserData, removeUserData };
};
