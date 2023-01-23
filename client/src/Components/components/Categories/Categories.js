import styles from "./Categories.module.css";

import { CategoryItem } from "../CategoryItem/CategoryItem";

export const Categories = ({ data }) => {
    return (
        <section className={styles["categories"]}>
            <header className={styles["categories-header"]}>
                <h1 className={styles["title"]}>Categories</h1>
            </header>
            <div className={styles["categories-container"]}>
                {data.map((c) => (
                    <CategoryItem
                        key={c._id}
                        category={c}
                        subcategories={c.subcategories}
                    />
                ))}
            </div>
        </section>
    );
};
