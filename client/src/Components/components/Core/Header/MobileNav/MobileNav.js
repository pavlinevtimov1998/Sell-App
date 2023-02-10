import { Link } from "react-router-dom";

import styles from "../Header.module.css";

export const MobileNav = ({
    userData,
    isMobileNavVisible,
    mobileNavHandler,
}) => {
    const className = isMobileNavVisible ? "show" : "hide";
    console.log(className);
    return (
        <aside className={`${styles["mobile-nav"]} ${styles[className]}`}>
            <button
                onClick={mobileNavHandler}
                type="button"
                className={styles["close-mobile-nav"]}
            >
                <svg
                    width={30}
                    height={30}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                >
                    <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </svg>
            </button>
            <header className={styles["user-container"]}>
                <div className={styles["user-wrapper"]}>
                    <h2 className={styles["title"]}>
                        <span className={styles["greeting"]}>Hello, </span>{" "}
                        <span className={styles["username"]}>
                            Userrrrrrrrrrrrrrrrrrrrrr...
                        </span>
                    </h2>
                    <img
                        className={styles["user-img"]}
                        src="/user-default.png"
                        alt=""
                    />
                </div>
            </header>
            <div className={styles["links-container"]}>
                <ul className={styles["list"]}>
                    <li className={styles["item"]}>
                        <Link>Some link</Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link>Some link</Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link>Some link</Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link>Some link</Link>
                    </li>
                    <li className={styles["item"]}>
                        <Link>Some link</Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
