import { createContext } from "react";

import { useLocalStorage } from "../Hooks/useLocalStorage";

export const AuthContext = createContext({
    userData: { email: "", _id: "", isAdmin: false },
    handleLogin: () => {},
    handleLogout: () => {},
});

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
