import styles from "./AuthPage.module.css";

import { AuthForm } from "../../components/AuthForm/AuthForm";
import { MainLayout } from "../../components/Core/MainLayout/MainLayout";

export const AuthPage = ({ action }) => {
    const title = action === "register" ? "Register" : "Login";

    return (
        <MainLayout>
            <section className={styles["auth-section"]}>
                <article className={styles["form-wraper"]}>
                    
                    <AuthForm title={title} />

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
                </article>
            </section>
        </MainLayout>
    );
};
