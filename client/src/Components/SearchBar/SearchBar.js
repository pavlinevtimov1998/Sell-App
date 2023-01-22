import styles from "./SearchBar.module.css";

export const SearchBar = () => {
    return (
        <section className={styles["form-container"]}>
            <form className={styles["search-form"]}>
                <div
                    className={`${styles["input-search"]} ${styles["search"]}`}
                >
                    <div>icon</div>
                    <input type="text" name="title" />
                </div>
                <div className={`${styles["search-town"]} ${styles["search"]}`}>
                    <div>icon</div>
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        id="location"
                    />
                </div>
                <div className={styles["btn-container"]}>
                    <button type="submit" className={styles["search-btn"]}>
                        <div>
                            <span>Search</span>
                        </div>
                    </button>
                </div>
            </form>
        </section>
    );
};
