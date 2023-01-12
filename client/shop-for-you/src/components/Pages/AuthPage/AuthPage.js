import { AuthForm } from "../../Components/AuthForm/AuthForm";
import styles from "./AuthPage.module.css";

export const AuthPage = ({ type }) => {
    const title = type === "login" ? "Login" : "Register";

    return (
        <section className={styles["wrapper"]}>
            <div className={styles["heading"]}>
                <h1>{title}</h1>
            </div>

            <AuthForm styles={styles} type={type} />
        </section>
    );
};
