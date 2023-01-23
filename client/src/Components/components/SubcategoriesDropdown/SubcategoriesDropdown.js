import styles from "./SubcategoriesDropdown.module.css";

import { Link } from "react-router-dom";

export const SubcategoriesDropdown = ({ subcategories, isVisible }) => {
    return (
        <article
            className={`${styles["subcategories-dropdown"]}  ${styles[isVisible]}`}
        >
            <div className={styles["subcat-container"]}>
                {subcategories.map((s) => (
                    <Link
                        className={styles["subcategory"]}
                        key={s._id}
                        title={s.title}
                    >
                        {s.title}
                    </Link>
                ))}
            </div>
        </article>
    );
};
