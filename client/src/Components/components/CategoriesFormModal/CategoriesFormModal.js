import styles from "./CategoriesFormModal.module.css";

export const CategoriesFormModal = ({ isModalOpen, categories }) => {
    return (
        <div
            className={`${styles["categories-modal-wrapper"]} ${
                styles[isModalOpen ? "open" : "hide"]
            }`}
        >
            <section className={styles["categories-modal"]}>
                <header className={styles["modal-header"]}>
                    <h2 className={styles["modal-title"]}>Categories</h2>
                </header>
                <div className={styles["categories"]}>
                    {categories.map((c) => (
                        <button
                            key={c._id}
                            value={c.title}
                            className={styles["category-btn"]}
                        >
                            <span className={styles["category-title"]}>
                                {c.title}
                            </span>
                            <img
                                className={styles["category-img"]}
                                src={c.image}
                                alt={c.title}
                            />
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};
