import { Link } from "react-router-dom";
import { AuthForm } from "../../Components/AuthForm/AuthForm";
import styles from "./AuthPage.module.css";

export const AuthPage = ({ isRegister }) => {
    const title = isRegister ? "Register" : "Login";

    return (
        <section className={styles["wrapper"]}>
            <div className={styles["heading"]}>
                <h1>{title}</h1>
                {!isRegister && (
                    <p className={styles["register-link"]}>
                        Don't have account?
                        <Link to="/register"> Click here!</Link>
                    </p>
                )}
            </div>

            <AuthForm styles={styles} isRegister={isRegister} />
        </section>
    );
};
