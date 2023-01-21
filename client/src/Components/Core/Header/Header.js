import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <nav className={styles["nav-bar"]}>
                <article className={styles["header-logo"]}>
                    <a href="/">
                        <img src="/logo.png" alt="LOGO" />
                    </a>
                </article>
                {/* <article className={styles["header-links"]}>
                    <ul className={styles["nav-links"]}>
                        <li className={styles["profile"]}>
                            <a href="/users/profile">
                                <span>Your profile</span>
                            </a>
                            <div className={styles["menu"]}>
                                <div className={styles["drop-down"]}>
                                    <div className={styles["user"]}>
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
                        </li>
                    </ul>
                    <a
                        href="/products/create"
                        className={styles["add-post toggle"]}
                    >
                        <span>Add Product</span>
                    </a>
                </article> */}
                <article className={styles["header-links"]}>
                    <ul>
                        <li>
                            <a href="/users/login">
                                <span>Login</span>
                            </a>
                        </li>
                    </ul>
                    <a href="/users/register" className={styles["toggle"]}>
                        <span>Sign up</span>
                    </a>
                </article>
            </nav>
        </header>
    );
};
