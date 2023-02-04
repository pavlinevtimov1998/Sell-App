import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";

import { logout } from "../../../Services/userService";

export const Logout = () => {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout()
            .then(() => {
                handleLogout();
                navigate("/", { replace: true });
            })
            .catch((err) => {
                if (err.message.includes("Token expired!")) {
                    handleLogout();
                }
                navigate("/", { replace: true });
            });
    });

    return null;
};
