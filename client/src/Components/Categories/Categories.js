import { useEffect, useState } from "react";

import styles from "./Categories.module.css";

import { CategoryItem } from "../CategoryItem/CategoryItem";

export const Categories = () => {
    const [categories, setCategories] = useState(null);

    const getData = () => {
        fetch("http://localhost:3030/api/categories")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setCategories(res);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className={styles["categories"]}>
            <header className={styles["categories-header"]}>
                <h1 className={styles["title"]}>Categories</h1>
            </header>
            <div className={styles["categories-container"]}>
                {categories &&
                    categories.map((c) => (
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
