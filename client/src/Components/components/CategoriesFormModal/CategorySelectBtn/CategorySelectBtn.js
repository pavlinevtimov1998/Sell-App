import { useState } from "react";
import { CategoriesFormModal } from "../CategoriesFormModal";
import styles from "./CategorySelectBtn.module.css";

export const CategorySelectBtn = ({ categories, inputData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null);

    const chooseCategoryHandler = (category) => setData(category);

    const clearCategoryData = () => setData(null);

    const openCategoriesModal = () => setIsModalOpen(true);

    const closeCategoriesModal = () => setIsModalOpen(false);

    return (
        <>
            <div
                className={`${styles["select-wrapper"]} ${
                    styles[data ? "selected" : ""]
                }`}
            >
                {data ? (
                    <div className={styles["selected-category"]}>
                        <div className={styles["category-content"]}>
                            <img
                                className={styles["category-img"]}
                                src={data.category.image}
                                alt={data.category.title}
                            />
                            <div className={styles["title-container"]}>
                                <p className={styles["subcategory-title"]}>
                                    {data.subcategory}
                                </p>
                                <p className={styles["category-title"]}>
                                    {data.category.title}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={clearCategoryData}
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
                categories={categories}
                closeCategoriesModal={closeCategoriesModal}
                chooseCategoryHandler={chooseCategoryHandler}
            />
        </>
    );
};
