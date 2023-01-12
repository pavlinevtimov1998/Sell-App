import styles from './CategoriesHeader.module.css'

import { useRef } from "react";

import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

const subcategories = [1, 2, 3, 4, 5];

export const CategoriesHeader = () => {
    const dropdownRef = useRef([]);

    const dropDownMenuHandler = (e, index) => {
        if (e.type === "mouseover") {
            dropdownRef.current[index].classList.add("active-dropdown");
        } else {
            dropdownRef.current[index].classList.remove("active-dropdown");
        }
    };

    return (
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
    );
};
