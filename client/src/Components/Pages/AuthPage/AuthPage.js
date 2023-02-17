import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

import styles from "./AuthPage.module.css";

import { LoginForm } from "../../components/AuthForms/LoginForm";
import { useGoogleLogin } from "@react-oauth/google";
import { RegisterForm } from "../../components/AuthForms/RegisterForm";
import { thirdPartyAuth } from "../../../Services/userService";
import { useNavigate } from "react-router-dom";

export const AuthPage = ({ action }) => {
    const [user, setUser] = useState(null);
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (res) => setUser(res),
        onError: (error) => console.log(error),
    });

    useEffect(() => {
        if (user) {
            fetch(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((res) => res.json())
                .then((result) =>
                    thirdPartyAuth({
                        email: result.email,
                        image: result.picture,
                        id: result.id,
                    })
                )
                .then((result) => {
                    handleLogin(result);
                    setUser(null);
                    navigate("/", { replace: true });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            <section className={styles["auth-section"]}>
                <div className={styles["form-wraper"]}>
                    {action === "register" ? <RegisterForm /> : <LoginForm />}

                    <div className={styles["line-container"]}>
                        <div className={styles["line"]} />
                        <p>Or</p>
                        <div className={styles["line"]} />
                    </div>
                    <article className={styles["options"]}>
                        <div className={styles["opt"]}>
                            <button
                                onClick={login}
                                className={styles["btn-google"]}
                                type="button"
                            >
                                <span className={styles["btn-content"]}>
                                    Sign In with
                                </span>

                                <svg
                                    width={30}
                                    height={30}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488 512"
                                >
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                </svg>
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
};
