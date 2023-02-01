import { useState } from "react";

import styles from "./CategoryModalItem.module.css";

import { SubcategoryModalItem } from "../SubcategoryModalItem/SubcategoryModalItem";

export const CategoryModalItem = ({
    category,
    chooseCategoryHandler,
    closeCategoriesModal,
}) => {
    const [isSubcatOpen, setIsSubcatOpen] = useState(false);

    const toggleSubcategoryOptions = () => setIsSubcatOpen((state) => !state);

    return (
        <div className={styles["btn-container"]}>
            <button
                onClick={toggleSubcategoryOptions}
                value={category.title}
                type="button"
                className={styles["category-btn"]}
            >
                <span className={styles["category-title"]}>
                    {category.title}
                </span>
                <img
                    className={styles["category-img"]}
                    src={category.image}
                    alt={category.title}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    width={16}
                    height={16}
                >
                    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                </svg>
            </button>
            <div
                className={`${styles["subcategories-container"]} ${
                    styles[`${isSubcatOpen ? "open" : ""}`]
                }`}
            >
                <ul className={styles["subcategories-list"]}>
                    {category.subcategories.map((s) => (
                        <SubcategoryModalItem
                            key={s._id}
                            toggleSubcategoryOptions={toggleSubcategoryOptions}
                            closeCategoriesModal={closeCategoriesModal}
                            chooseCategoryHandler={chooseCategoryHandler}
                            subcategory={s}
                            category={category}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
