import { useState } from "react";
import { useHeaderVisibility } from "../../../Hooks/useHeaderVisibility";

import styles from "./Header.module.css";

export const Header = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const { isHeaderVisible } = useHeaderVisibility();

    const toggleDropdown = () => {
        setIsDropdownVisible((state) => !state);
    };

    const headerClass = isHeaderVisible ? "show" : "hide";

    return (
        <header className={`${styles["header"]} ${styles[headerClass]}`}>
            <nav className={styles["nav-bar"]}>
                <article className={styles["header-logo"]}>
                    <a href="/" className={styles["logo"]}>
                        <img src="/logo.png" alt="LOGO" />
                    </a>
                </article>
                <article className={styles["user-options"]}>
                    <a
                        href="/users/profile"
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={toggleDropdown}
                        className={styles["profile"]}
                    >
                        <span>Your profile</span>
                        <div
                            className={`${styles["menu"]} ${
                                styles[isDropdownVisible ? "open" : ""]
                            }`}
                        >
                            <div className={styles["drop-down"]}>
                                <div className={styles["username"]}>
                                    <h3>Userbane</h3>
                                </div>
                                <ul className={styles["user-links"]}>
                                    <li>
                                        <a href="/users/messages">
                                            <span>Messages</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/users/profile">
                                            <span>My Posts</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <span>Your Bag</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <span>Payments</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/delivery">
                                            <span>Delivery</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/users/settings">
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li className={styles["logout"]}>
                                        <a href="/">
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </a>
                    <a href="/products/create" className={styles["toggle"]}>
                        <span>Add Product</span>
                    </a>
                </article>

                {/* <article className={styles["guest-links"]}>
                    <ul>
                        <li>
                            <a href="/users/login" className={styles["login"]}>
                                <span>Login</span>
                            </a>
                        </li>
                    </ul>
                    <a href="/users/register" className={styles["toggle"]}>
                        <span>Sign up</span>
                    </a>
                </article> */}
            </nav>
        </header>
    );
};
