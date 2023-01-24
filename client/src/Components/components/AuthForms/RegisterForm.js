import styles from "./AuthForms.module.css";

export const RegisterForm = () => {
    return (
        <form className={styles["form"]}>
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
                    />
                    {/* <p className={styles["error"]}>
                Email is required!
            </p>
            <p className={styles["error"]}>
                Invalid email!
            </p> */}
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
                    />
                    {/* <p className={styles["error"]}>
                Password is required!
            </p>
            <p className={styles["error"]}>
                Password should be at least 6 characters!
            </p> */}
                </div>

                <div className={styles["field"]}>
                    <label className={styles["label"]} htmlFor="password">
                        Repeat Password
                    </label>
                    <input
                        className={styles["pass-input"]}
                        type="password"
                        name="password"
                        id="password"
                    />
                    {/* <p className={styles["error"]}>
                Password is required!
            </p>
            <p className={styles["error"]}>
                Password should be at least 6 characters!
            </p> */}
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
