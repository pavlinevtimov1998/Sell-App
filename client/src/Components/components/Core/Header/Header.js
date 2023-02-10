import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useHeaderVisibility } from "../../../../Hooks/useHeaderVisibility";
import { useResize } from "../../../../Hooks/useResize";

import styles from "./Header.module.css";
import { MobileNav } from "./MobileNav/MobileNav";

import { GuestOptions } from "./UserNav/GuestOptions";
import { UserOptions } from "./UserNav/UserOptions";

export const Header = () => {
    const { isHeaderVisible } = useHeaderVisibility();
    const { state: isMobile } = useResize(600);
    const { userData } = useContext(AuthContext);
    const [isMobileNavVisible, setisMobileNavVisible] = useState(false);

    let headerClass;

    if (!isMobile) {
        headerClass = isHeaderVisible ? "show" : "hide";
    } else {
        headerClass = "show";
    }

    const mobileNavHandler = () => setisMobileNavVisible((state) => !state);

    return (
        <>
            <header className={`${styles["header"]} ${styles[headerClass]}`}>
                <nav className={styles["nav-bar"]}>
                    <article className={styles["header-logo"]}>
                        <Link to="/" className={styles["logo"]}>
                            <img src="/logo.png" alt="LOGO" />
                        </Link>
                    </article>
                    {userData && !isMobile && <UserOptions />}
                    {!userData && !isMobile && <GuestOptions />}
                    {isMobile && (
                        <button
                            onClick={mobileNavHandler}
                            type="button"
                            className={styles["mobile-nav-btn"]}
                        >
                            <svg
                                width={30}
                                height={30}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </button>
                    )}
                </nav>
            </header>
            {isMobile && (
                <MobileNav
                    isMobileNavVisible={isMobileNavVisible}
                    mobileNavHandler={mobileNavHandler}
                    userData={userData}
                />
            )}
        </>
    );
};
