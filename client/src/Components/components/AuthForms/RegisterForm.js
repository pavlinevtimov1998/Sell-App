import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";
import { register } from "../../../Services/userService";

import styles from "./AuthForms.module.css";

export const RegisterForm = () => {
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        rePassword: "",
    });
    const [errors, setErrors] = useState({
        email: {
            required: false,
            isNotValid: false,
        },
        password: {
            required: false,
            minLength: false,
        },
        rePassword: {
            required: false,
            isNotMatch: false,
        },
    });

    const emailValidator = (e) => {
        if (
            data.email !== "" &&
            !/[a-zA-Z0-9]{5,35}@[a-zA-Z]{2,10}\.[a-z]{1,6}/g.test(data.email)
        ) {
            setErrors((state) => ({
                ...state,
                email: { required: false, isNotValid: true },
            }));
        } else if (
            /[a-zA-Z0-9]{5,35}@[a-zA-Z]{2,10}\.[a-z]{1,6}/g.test(data.email)
        ) {
            setErrors((state) => ({
                ...state,
                email: { required: false, isNotValid: false },
            }));
        }
    };

    const requiredValidator = (name, value) => {
        if (value === "") {
            setErrors((state) => ({
                ...state,
                [name]: { ...state[name], required: true },
            }));
        } else {
            setErrors((state) => ({
                ...state,
                [name]: { ...state[name], required: false },
            }));
        }
    };

    const passwordValidator = () => {
        if (data.password.length < 6 && data.password !== "") {
            setErrors((state) => ({
                ...state,
                password: { ...state.password, minLength: true },
            }));
        } else {
            setErrors((state) => ({
                ...state,
                password: { ...state.password, minLength: false },
            }));
        }
    };

    const rePassValidator = () => {
        if (data.rePassword !== data.password) {
            setErrors((state) => ({
                ...state,
                rePassword: { ...state.rePassword, isNotMatch: true },
            }));
        } else {
            setErrors((state) => ({
                ...state,
                rePassword: { ...state.rePassword, isNotMatch: false },
            }));
        }
    };

    const canSubmit = () => {
        emailValidator();
        passwordValidator();
        rePassValidator();

        const hasEmpty = Object.values(data).find((value) => value === "");

        if (hasEmpty !== undefined) {
            Object.entries(data).forEach(([key, value]) => {
                if (value === "") {
                    return setErrors((state) => ({
                        ...state,
                        [key]: { ...state[key], required: true },
                    }));
                }
            });
            return false;
        }

        const isInvalid = Object.values(errors).reduce(
            (a, v) => Object.assign(a, v),
            {}
        );

        if (Object.values(isInvalid).includes(true)) {
            return false;
        }

        return true;
    };

    const onChangeHandler = (e) =>
        setData((state) => ({ ...state, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();

        if (!canSubmit()) {
            return;
        }

        register(data)
            .then((result) => {
                handleLogin(result);
                navigate("/", { replace: true });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form className={styles["form"]} onSubmit={onSubmit}>
            <div className={styles["title"]}>
                <h3>Register</h3>
            </div>
            <div className={styles["all-fields"]}>
                <div className={styles["field"]}>
                    <label className={styles["label"]} htmlFor="email">
                        Your email
                    </label>
                    <input
                        className={styles["email-input"]}
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        onBlur={(e) => {
                            emailValidator();
                            requiredValidator(e.target.name, data.email);
                        }}
                    />
                    {errors.email.required && (
                        <p className={styles["error"]}>Email is required!</p>
                    )}
                    {errors.email.isNotValid && (
                        <p className={styles["error"]}>Invalid email!</p>
                    )}
                </div>
                <div className={styles["field"]}>
                    <label className={styles["label"]} htmlFor="password">
                        Password
                    </label>
                    <input
                        className={styles["pass-input"]}
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={onChangeHandler}
                        onBlur={(e) => {
                            passwordValidator();
                            requiredValidator(e.target.name, data.password);
                        }}
                    />
                    {errors.password.required && (
                        <p className={styles["error"]}>Password is required!</p>
                    )}
                    {errors.password.minLength && (
                        <p className={styles["error"]}>
                            Password should be at least 6 characters!
                        </p>
                    )}
                </div>

                <div className={styles["field"]}>
                    <label className={styles["label"]} htmlFor="rePassword">
                        Repeat Password
                    </label>
                    <input
                        className={styles["pass-input"]}
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        value={data.rePassword}
                        onChange={onChangeHandler}
                        onBlur={(e) => {
                            rePassValidator();
                            requiredValidator(e.target.name, data.rePassword);
                        }}
                    />
                    {errors.rePassword.required && (
                        <p className={styles["error"]}>Password is required!</p>
                    )}
                    {errors.rePassword.isNotMatch &&
                        !errors.rePassword.required && (
                            <p className={styles["error"]}>
                                Passwords don't match!
                            </p>
                        )}
                </div>
            </div>
            <div className={styles["action"]}>
                {/* <div className={styles["password-link"]}>
                    <a href="/">Forgot password?</a>
                </div> */}
                <div className={styles["btn-container"]}>
                    <button className={styles["btn"]} type="submit">
                        <svg
                            className={styles["btn-icon"]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
                        </svg>
                        <span>Login</span>
                    </button>
                </div>
            </div>
        </form>
    );
};
