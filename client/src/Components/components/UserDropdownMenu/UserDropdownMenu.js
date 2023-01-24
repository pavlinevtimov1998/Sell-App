import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

import { Link } from "react-router-dom";

import styles from "./UserDropdownMenu.module.css";

export const UserDropdownMenu = ({ isDropdownVisible }) => {
    const { userData } = useContext(AuthContext);

    return (
        <div
            className={`${styles["menu"]} ${
                styles[isDropdownVisible ? "open" : ""]
            }`}
        >
            <div className={styles["drop-down"]}>
                <div className={styles["username"]}>
                    <h3>Hello, {userData.email}</h3>
                </div>
                <ul className={styles["user-links"]}>
                    <li>
                        <Link to="/users/messages">
                            <span>Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users/profile">
                            <span>My Posts</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span>Your Bag</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <span>Payments</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/delivery">
                            <span>Delivery</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/users/settings">
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li className={styles["logout"]}>
                        <Link to="/">
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
