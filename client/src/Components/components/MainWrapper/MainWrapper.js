import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

import { initialRequest } from "../../../Services/userService";

import { AppRouter } from "../Router/Router";

export const MainWrapper = () => {
    const { handleLogin } = useContext(AuthContext);

    useEffect(() => {
        initialRequest()
            .then((result) => {
                if (!result.message) {
                    handleLogin(result);
                }
            })
            .catch((err) => console.log(err.message));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AppRouter />;
};
