import styles from "./CategoryItem.module.css";

export const CategoryItem = ({ category, subcategories }) => {
    console.log(subcategories);
    return (
        <a className={styles["item"]} href={styles["item"]}>
            <div className={styles["image-container"]}>
                <img src={category.image} alt={category.title} />
            </div>
            <div className={styles["category-title"]}>
                <span>{category.title}</span>
            </div>
        </a>
    );
};
