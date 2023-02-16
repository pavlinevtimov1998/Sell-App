import styles from "./SubcategoriesDropdown.module.css";

import { Link } from "react-router-dom";

export const SubcategoriesDropdown = ({
    categoryTitle,
    subcategories,
    isVisible,
}) => {
    return (
        <article
            className={`${styles["subcategories-dropdown"]}  ${styles[isVisible]}`}
        >
            <div className={styles["subcat-container"]}>
                <Link
                    className={styles["subcategory"]}
                    title={`See everything in ${categoryTitle}`}
                    to={`/listing?category=${categoryTitle}`}
                >
                    See evereything in {categoryTitle}
                </Link>
                {subcategories.map((s) => (
                    <Link
                        className={styles["subcategory"]}
                        key={s._id}
                        title={s.title}
                        to={`/listing?category=${categoryTitle}&subcategory=${s.title}`}
                    >
                        {s.title}
                    </Link>
                ))}
            </div>
        </article>
    );
};
