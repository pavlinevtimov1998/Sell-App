import styles from "../CategoriesFormModal.module.css";

export const SubcategoryModalItem = ({
    subcategory,
    category,
    chooseCategoryHandler,
}) => {
    return (
        <li className={styles["item"]}>
            <button
                onClick={(e) =>
                    chooseCategoryHandler(e, {
                        categoryTitle: category.title,
                        image: category.image,
                        subcategoryTitle: subcategory.title,
                    })
                }
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
