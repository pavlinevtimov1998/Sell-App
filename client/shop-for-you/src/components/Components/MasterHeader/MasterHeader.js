import { useRef } from "react";
import { Link } from "react-router-dom";
import { CartDropdown } from "../CartDropdown/CartDropdown";
import { SearchDropdown } from "../SearchDropdown/SearchDropdown";

import styles from "./MasterHeader.module.css";

export const MasterHeader = () => {
    const refArr = useRef([]);

    const dropDownHandler = (e, index) => {
        switch (index) {
            case 0:
                if (e.type === "mouseover") {
                    refArr.current[index].classList.add(
                        "active-dropdown-search"
                    );
                } else {
                    refArr.current[index].classList.remove(
                        "active-dropdown-search"
                    );
                }
                break;
            case 1:
                if (e.type === "mouseover") {
                    refArr.current[index].classList.add("active-dropdown-cart");
                } else {
                    refArr.current[index].classList.remove(
                        "active-dropdown-cart"
                    );
                }
                break;
            default:
                break;
        }
    };

    return (
        <nav className={styles["master-header"]}>
            <div className={styles["master-container"]}>
                <div className={styles["space"]} />
                <Link to="/" className={styles["logo"]}>
                    <img src="/images/logo-no-background.png" alt="" />
                </Link>
                <article className={styles["auth"]}>
                    <ul className={styles["right-elements"]}>
                        <li
                            onMouseOver={(e) => dropDownHandler(e, 0)}
                            onMouseLeave={(e) => dropDownHandler(e, 0)}
                            className={`${styles["search-icon"]} ${styles["transition"]}`}
                        >
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 183.792 183.792"
                                style={{
                                    enableBackground: "new 0 0 183.792 183.792",
                                }}
                                xmlSpace="preserve"
                            >
                                <path
                                    d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
	c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
	c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
	C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
	c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
	c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"
                                />
                            </svg>
                            <SearchDropdown elRef={refArr} />
                        </li>
                        <li className={styles["sign-btn"]}>
                            <Link
                                className={`${styles["sign-in"]} ${styles["transition"]}`}
                                to="/login"
                                alt="asd"
                            >
                                Sign In
                            </Link>
                        </li>
                        <li className={styles["line"]} />
                        <li
                            onMouseOver={(e) => dropDownHandler(e, 1)}
                            onMouseLeave={(e) => dropDownHandler(e, 1)}
                            className={styles["cart-btn"]}
                        >
                            <Link
                                className={styles["cart-btn-link"]}
                                to="/cart"
                                title="Cart"
                            >
                                <span>Cart /</span>
                                <span className={styles["price"]}> 0.00$ </span>
                                <svg
                                    className={styles["cart-icon"]}
                                    viewBox="0 0 32 32"
                                    id="i-cart"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="currentcolor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                >
                                    <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                                    <circle cx={25} cy={27} r={2} />
                                    <circle cx={12} cy={27} r={2} />
                                </svg>
                            </Link>
                            <CartDropdown elRef={refArr} />
                        </li>
                    </ul>
                </article>
            </div>
        </nav>
    );
};
