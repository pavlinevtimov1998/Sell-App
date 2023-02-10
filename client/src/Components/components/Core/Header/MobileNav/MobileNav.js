import { Link } from "react-router-dom";

import styles from "../Header.module.css";

export const MobileNav = () => {
    return (
        <aside className={styles["mobile-nav"]}>
            <div className={styles["user-container"]}></div>
            <div className={styles["links-container"]}>
                <ul className={styles["list"]}>
                    <li className={styles["item"]}>
                        <Link></Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link></Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link></Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link></Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link></Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
