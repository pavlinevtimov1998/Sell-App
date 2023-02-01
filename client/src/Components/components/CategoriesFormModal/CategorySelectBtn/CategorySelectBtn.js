import { useContext, useState } from "react";
import { FormContext } from "../../../../Contexts/FormContext";
import { CategoriesFormModal } from "../CategoriesFormModal";
import styles from "./CategorySelectBtn.module.css";

export const CategorySelectBtn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { clearCategoryHandler, selectedCategory } = useContext(FormContext);

    const openCategoriesModal = () => setIsModalOpen(true);

    const closeCategoriesModal = () => setIsModalOpen(false);

    return (
        <>
            <div
                className={`${styles["select-wrapper"]} ${
                    styles[selectedCategory ? "selected" : ""]
                }`}
            >
                {selectedCategory ? (
                    <div className={styles["selected-category"]}>
                        <div className={styles["category-content"]}>
                            <img
                                className={styles["category-img"]}
                                src={selectedCategory.category.image}
                                alt={selectedCategory.category.title}
                            />
                            <div className={styles["title-container"]}>
                                <p className={styles["subcategory-title"]}>
                                    {selectedCategory.subcategory}
                                </p>
                                <p className={styles["category-title"]}>
                                    {selectedCategory.category.title}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={clearCategoryHandler}
                            type="button"
                            className={styles["clear-btn"]}
                        >
                            <span className={styles["clear"]}>Clear</span>
                        </button>
                    </div>
                ) : (
                    <button
                        className={styles["select-btn"]}
                        type="button"
                        title="Choose Category"
                        onClick={openCategoriesModal}
                    >
                        <div className={styles["content"]}>
                            <p>Choose Category</p>
                            <svg
                                className={styles["select-icon"]}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                            </svg>
                        </div>
                    </button>
                )}
            </div>

            <CategoriesFormModal
                isModalOpen={isModalOpen}
                closeCategoriesModal={closeCategoriesModal}
            />
        </>
    );
};
