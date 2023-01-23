import { useFetch } from "../../Hooks/useFetch";

import styles from "./Categories.module.css";
import { getAll } from "../../Services/categoriesService";

import { CategoryItem } from "../CategoryItem/CategoryItem";

export const Categories = () => {
    const { isLoading, data, error } = useFetch(getAll);

    console.log(isLoading, data, error);

    return (
        <section className={styles["categories"]}>
            <header className={styles["categories-header"]}>
                <h1 className={styles["title"]}>Categories</h1>
            </header>
            <div className={styles["categories-container"]}>
                {data &&
                    data.map((c) => (
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
