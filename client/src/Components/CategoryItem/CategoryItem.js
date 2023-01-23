import styles from "./CategoryItem.module.css";

import { Link } from "react-router-dom";

export const CategoryItem = ({ category, subcategories }) => {
    console.log(subcategories);
    return (
        <Link className={styles["item"]}>
            <div className={styles["image-container"]}>
                <img className={styles["img"]} src={category.image} alt={category.title} />
            </div>
            <div className={styles["category-title"]}>
                <span>{category.title}</span>
            </div>
        </Link>
    );
};
