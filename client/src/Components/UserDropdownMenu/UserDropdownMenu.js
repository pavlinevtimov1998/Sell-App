import { Link } from "react-router-dom";
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
                        <Link href="/users/messages">
                            <span>Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/users/profile">
                            <span>My Posts</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <span>Your Bag</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <span>Payments</span>
                        </Link>
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
