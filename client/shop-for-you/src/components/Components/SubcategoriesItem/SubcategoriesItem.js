import { Link } from "react-router-dom";
import styles from "./SubcategoriesItem.module.css";

export const SubcategoriesItem = () => {
    return (
        <Link className={styles["subcategory-item"]}>
            <div className={styles["img-container"]}>
                <img
                    src="/images/nike-product.jpg"
                    className={styles["img"]}
                    alt="asd"
                />
            </div>
            <div>
                <h2 className={styles["title"]}>Subcategory Title</h2>
            </div>
        </Link>
    );
};
