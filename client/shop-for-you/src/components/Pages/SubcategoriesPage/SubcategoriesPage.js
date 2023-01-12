import styles from "./SubcategoriesPage.module.css";

import { SubcategorySearchBar } from "../../Components/SubcategorySearchBar/SubcategorySearchBar";
import { SubcategoriesItem } from "../../Components/SubcategoriesItem/SubcategoriesItem";

export const SubcategoriesPage = () => {
    return (
        <section className="subcategories-page">
            <SubcategorySearchBar category={"Men's"} />
            <div className={styles["subcategories-container"]}>
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
                <SubcategoriesItem />
            </div>
        </section>
    );
};
