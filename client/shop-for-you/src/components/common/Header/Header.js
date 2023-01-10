import { useEffect, useRef, useState } from "react";

import styles from "./Header.module.css";

import { DropdownMenu } from "../../DropdownMenu/DropdownMenu";

const subcategories = [1, 2, 3, 4, 5];

export const Header = () => {
    const [isScroll, setIsScroll] = useState(false);
    const dropdownRef = useRef([]);
    const stickyNavRef = useRef(null);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        if (isScroll) {
            stickyNavRef.current.style.top = "0px";
            stickyNavRef.current.style.opacity = 0.9;
        } else {
            stickyNavRef.current.style.top = "50px";
            stickyNavRef.current.style.opacity = 1;
        }

        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, [isScroll]);

    const scrollHandler = (e) => {
        if (e.currentTarget.scrollY >= 50) {
            setIsScroll(true);
        } else {
            setIsScroll(false);
        }
    };

    const dropDownMenuHandler = (e, index) => {
        if (e.type === "mouseover") {
            dropdownRef.current[index].classList.add("active-dropdown");
        } else {
            dropdownRef.current[index].classList.remove("active-dropdown");
        }
    };

    return (
        <header id="header">
            <nav className={styles["nav-contacts"]}>
                <div className={styles["contacts"]}>
                    <div className={styles["phone"]}>
                        <p className={styles["phone__number"]}>
                            Phone: +359 12312312
                        </p>
                    </div>
                    <div className={styles["delivery__message"]}>
                        <h2>Free delivery for order over 100$</h2>
                    </div>
                    <article className={styles["social"]}>
                        <a href="/" className={styles["github"]}>
                            <svg
                                className={[
                                    `${styles["social-icon"]} ${styles["transition"]}`,
                                ]}
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                            </svg>
                        </a>
                        <a href="/" className={styles["linkdin"]}>
                            <svg
                                className={[
                                    `${styles["social-icon"]} ${styles["transition"]}`,
                                ]}
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 382 382"
                                xmlSpace="preserve"
                            >
                                <path
                                    d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
	C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
	H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
	c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
	s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
	c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
	c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
	c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
	L341.91,330.654L341.91,330.654z"
                                />
                            </svg>
                        </a>
                    </article>
                </div>
            </nav>
            <div ref={stickyNavRef} className="fixed-nav">
                <nav className={styles["master-header"]}>
                    <div className={styles["master-container"]}>
                        <div className={styles["space"]} />
                        <a href="/" className={styles["logo"]}>
                            <img src="/images/logo-no-background.png" alt="" />
                        </a>
                        <article className={styles["auth"]}>
                            <ul className={styles["right-elements"]}>
                                <li
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
                                            enableBackground:
                                                "new 0 0 183.792 183.792",
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
                                    <div className={styles["form-container"]}>
                                        <form className={styles["search-form"]}>
                                            <input
                                                type="text"
                                                name="search"
                                                id="search"
                                            />
                                            <button
                                                className={styles["search-btn"]}
                                            >
                                                <svg
                                                    className={
                                                        styles[
                                                            "btn-search-icon"
                                                        ]
                                                    }
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 487.95 487.95"
                                                    style={{
                                                        enableBackground:
                                                            "new 0 0 487.95 487.95",
                                                    }}
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                                                    />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </li>
                                <li className={styles["sign-btn"]}>
                                    <a
                                        className={`${styles["sign-in"]} ${styles["transition"]}`}
                                        href="/"
                                        alt="asd"
                                    >
                                        Sign In
                                    </a>
                                </li>
                                <li className={styles["line"]} />
                                <li className={styles["cart-btn"]}>
                                    <a
                                        className={styles["cart-btn"]}
                                        href="/"
                                        title="Cart"
                                    >
                                        <span>Cart /</span>
                                        <span className={styles["price"]}>
                                            {" "}
                                            0.00${" "}
                                        </span>
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
                                    </a>
                                </li>
                            </ul>
                        </article>
                    </div>
                </nav>
                <nav className={styles["categories__nav"]}>
                    <div className={styles["categories__container"]}>
                        <ul className={styles["list"]}>
                            <li
                                onMouseOver={(e) => dropDownMenuHandler(e, 0)}
                                onMouseLeave={(e) => dropDownMenuHandler(e, 0)}
                                className={styles["list__item"]}
                            >
                                <a
                                    className={`${styles["item__link"]} ${styles["transition"]}`}
                                    href="/"
                                >
                                    Men's
                                </a>
                                <DropdownMenu
                                    elRef={dropdownRef}
                                    subcategories={subcategories}
                                />
                            </li>
                            <li
                                onMouseOver={(e) => dropDownMenuHandler(e, 1)}
                                onMouseLeave={(e) => dropDownMenuHandler(e, 1)}
                                className={styles["list__item"]}
                            >
                                <a
                                    className={[
                                        `${styles["item__link"]} ${styles["transition"]}`,
                                    ]}
                                    href="/"
                                >
                                    Women's
                                </a>
                                <DropdownMenu
                                    elRef={dropdownRef}
                                    subcategories={subcategories}
                                />
                            </li>
                            <li className={styles["list__item"]}>
                                <a
                                    className={`${styles["item__link"]} ${styles["transition"]}`}
                                    href="/"
                                >
                                    Sale
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};
