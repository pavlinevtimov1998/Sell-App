import { createContext } from "react";

import { useLocalStorage } from "../Hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { userData, addUserData, removeUserData } = useLocalStorage();

    const handleLogin = (data) => addUserData(data);

    const handleLogout = () => removeUserData();

    return (
        <AuthContext.Provider value={{ userData, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
