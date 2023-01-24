import { Link } from "react-router-dom";

import styles from "../Header.module.css";

export const GuestOptions = () => {
    return (
        <article className={styles["guest-links"]}>
            <Link to="/login" className={styles["login"]}>
                <span>Login</span>
            </Link>
            <Link
                to="/register"
                className={`${styles["toggle"]} ${styles["sign-up-link"]}`}
            >
                <span>Sign up</span>
            </Link>
        </article>
    );
};
