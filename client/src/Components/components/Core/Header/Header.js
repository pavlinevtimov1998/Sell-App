import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useHeaderVisibility } from "../../../../Hooks/useHeaderVisibility";

import styles from "./Header.module.css";

import { GuestOptions } from "./UserNav/GuestOptions";
import { UserOptions } from "./UserNav/UserOptions";

export const Header = () => {
    const { isHeaderVisible } = useHeaderVisibility();
    const { userData } = useContext(AuthContext);

    const headerClass = isHeaderVisible ? "show" : "hide";

    return (
        <header className={`${styles["header"]} ${styles[headerClass]}`}>
            <nav className={styles["nav-bar"]}>
                <article className={styles["header-logo"]}>
                    <Link to="/" className={styles["logo"]}>
                        <img src="/logo.png" alt="LOGO" />
                    </Link>
                </article>
                {userData ? <UserOptions /> : <GuestOptions />}
            </nav>
        </header>
    );
};
