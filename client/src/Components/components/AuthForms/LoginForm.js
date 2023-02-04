import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ErrorContext } from "../../../Contexts/ErrorContext";

import { login } from "../../../Services/userService";
import { FormButton } from "../FormButton/FormButton";

import styles from "./AuthForms.module.css";

export const LoginForm = () => {
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setFormErrors] = useState({ email: false, password: false });
    const [submitError, setSubmitError] = useState({
        email: false,
        password: false,
    });
    const { setError } = useContext(ErrorContext);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const onChangeHandler = (e) =>
        setData((state) => ({ ...state, [e.target.name]: e.target.value }));

    const validator = (e) => {
        if (e.target.value === "") {
            setFormErrors((errors) => ({
                ...errors,
                [e.target.name]: true,
            }));
        } else {
            setFormErrors((errors) => ({
                ...errors,
                [e.target.name]: false,
            }));
        }
        setSubmitError({ email: false, password: false });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (data.email === "" || data.password === "") {
            setFormErrors((state) => ({
                email: data.email === "",
                password: data.password === "",
            }));
            return;
        }

        login(data)
            .then((result) => {
                handleLogin(result);
                navigate("/", { replace: true });
            })
            .catch((err) => {
                setSubmitError({ email: true, password: true });
                setError({ message: err.message, hasError: true });
                console.log(err);
            });
    };

    return (
        <form className={styles["form"]} onSubmit={onSubmit}>
            <div className={styles["title"]}>
                <h3>Login</h3>
            </div>
            <div className={styles["all-fields"]}>
                <div className={styles["field"]}>
                    <label className={styles["label"]} htmlFor="email">
                        Your email
                    </label>
                    <input
                        className={`${styles["email-input"]} ${
                            submitError.email && styles["input-error"]
                        }`}
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        onBlur={validator}
                    />

                    {errors.email && (
                        <p className={styles["error"]}>Email is required!</p>
                    )}
                </div>
                <div className={styles["field"]}>
                    <label className={styles["label"]} htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`${styles["pass-input"]} ${
                            submitError.password && styles["input-error"]
                        }`}
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        onBlur={validator}
                    />
                    {errors.password && (
                        <p className={styles["error"]}>Password is required!</p>
                    )}
                </div>
            </div>
            <div className={styles["action"]}>
                <div className={styles["password-link"]}>
                    <a href="/">Forgot password?</a>
                </div>
                <div className={styles["btn-container"]}>
                    <FormButton content="Login">
                        {
                            <svg
                                width={20}
                                height={20}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
                            </svg>
                        }
                    </FormButton>
                </div>
            </div>
        </form>
    );
};
