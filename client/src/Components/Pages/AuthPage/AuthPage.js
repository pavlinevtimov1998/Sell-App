import styles from "./AuthPage.module.css";

import { RegisterForm } from "../../components/AuthForms/RegisterForm";
import { LoginForm } from "../../components/AuthForms/LoginForm";

export const AuthPage = ({ action }) => {
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
                            <button type="button">
                                <span>
                                    {action === "register"
                                        ? "Sign In"
                                        : "Log In"}{" "}
                                    with Facebook
                                </span>
                            </button>
                        </div>
                        <div className={styles["opt"]}>
                            <button type="button">
                                <span>
                                    {action === "register"
                                        ? "Sign In"
                                        : "Log In"}{" "}
                                    with Google
                                </span>
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
};
