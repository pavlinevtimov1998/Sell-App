import { useContext } from "react";
import { FormContext } from "../../../../../Contexts/FormContext";

import styles from "../CategoriesFormModal.module.css";

export const SubcategoryModalItem = ({
    subcategory,
    category,
    closeCategoriesModal,
}) => {
    const { chooseCategoryHandler } = useContext(FormContext);

    return (
        <li className={styles["item"]}>
            <button
                onClick={() => {
                    chooseCategoryHandler({
                        category: {
                            title: category.title,
                            image: category.image,
                        },
                        subcategory: subcategory.title,
                    });
                    closeCategoriesModal();
                }}
                type="button"
                className={styles["subcategory-btn"]}
            >
                <span className={styles["subcategory-title"]}>
                    {subcategory.title}
                </span>
            </button>
        </li>
    );
};
