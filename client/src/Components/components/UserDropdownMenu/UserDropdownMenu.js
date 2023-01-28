import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

import { Link } from "react-router-dom";

import styles from "./UserDropdownMenu.module.css";
import { trim } from "../../../Utils/util";

export const UserDropdownMenu = ({ isDropdownVisible }) => {
    const { userData } = useContext(AuthContext);

    return (
        <div
            className={`${styles["menu"]} ${
                styles[isDropdownVisible ? "open" : ""]
            }`}
        >
            <div className={styles["drop-down"]}>
                <div className={styles["user"]}>
                    <h3 className={styles["greet"]}>
                        <span>Hello, </span>
                        <span className={styles["email"]}>
                            {trim(userData.email, 16)}
                        </span>
                    </h3>
                </div>
                <ul className={styles["user-links"]}>
                    <li>
                        <Link className={styles["link"]} to="/users/messages">
                            <span>Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={styles["link"]} to="/users/profile">
                            <span>My Posts</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={styles["link"]} to="/">
                            <span>Your Bag</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={styles["link"]} to="/">
                            <span>Payments</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={styles["link"]} to="/delivery">
                            <span>Delivery</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={styles["link"]} to="/users/settings">
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li className={styles["logout"]}>
                        <Link className={styles["link"]} to="/logout">
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
