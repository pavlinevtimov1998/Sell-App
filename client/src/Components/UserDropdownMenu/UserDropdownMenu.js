import styles from "./UserDropdownMenu.module.css";

export const UserDropdownMenu = ({ isDropdownVisible }) => {
    return (
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
    );
};
