import styles from "../CategoriesFormModal.module.css";

export const SubcategoryModalItem = ({
    subcategory,
    category,
    chooseCategoryHandler,
    closeCategoriesModal,
    toggleSubcategoryOptions,
}) => {
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
                    toggleSubcategoryOptions();
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
