import styles from "./CategoryItem.module.css";

import { useState } from "react";
import { SubcategoriesDropdown } from "../SubcategoriesDropdown/SubcategoriesDropdown";
import { Link } from "react-router-dom";

export const CategoryItem = ({ category, subcategories }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleSubcategoryMenu = () => {
        setIsDropdownVisible((state) => !state);
    };

    const isVisible = isDropdownVisible ? "open" : "hide";

    return (
        <div
            onMouseLeave={toggleSubcategoryMenu}
            onMouseEnter={toggleSubcategoryMenu}
            className={styles["item-wrapper"]}
        >
            <Link title={category.title} className={`${styles["item"]}`}>
                <div className={styles["image-container"]}>
                    <img
                        className={styles["img"]}
                        src={category.image}
                        alt={category.title}
                    />
                </div>
                <div className={styles["category-title"]}>
                    <span>{category.title}</span>
                    <svg
                        className={styles["arrow-down"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                    </svg>
                </div>
            </Link>{" "}
            <SubcategoriesDropdown
                subcategories={subcategories}
                isVisible={isVisible}
            />
        </div>
    );
};
