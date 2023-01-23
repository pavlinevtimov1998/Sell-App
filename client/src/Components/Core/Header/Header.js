import { useState } from "react";
import { Link } from "react-router-dom";
import { useHeaderVisibility } from "../../../Hooks/useHeaderVisibility";
import { UserDropdownMenu } from "../../UserDropdownMenu/UserDropdownMenu";

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
                    <button
                        type="button"
                        title="Profile"
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={toggleDropdown}
                        className={styles["profile-btn"]}
                    >
                        <svg
                            className={styles["user-icon"]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                        <span>Your profile</span>
                        <svg
                        className={styles["arrow-icon"]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                        </svg>
                        <UserDropdownMenu
                            isDropdownVisible={isDropdownVisible}
                        />
                    </button>
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
