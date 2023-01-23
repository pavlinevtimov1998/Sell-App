import styles from "./SearchBar.module.css";

export const SearchBar = () => {
    return (
        <section className={styles["search"]}>
            <form className={styles["search-form"]}>
                <div className={styles["product-search"]}>
                    <svg
                        className={styles["search-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
                    </svg>
                    <input
                        placeholder="Search between 12983123 products..."
                        type="text"
                        name="title"
                        className={styles["product-input"]}
                    />
                </div>
                <div className={styles["town-search"]}>
                    <svg
                        className={styles["location-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        className={styles["location-input"]}
                    />
                </div>
                <div className={styles["btn-container"]}>
                    <button type="submit" className={styles["search-btn"]}>
                        <span>Search</span>
                        <svg
                            className={styles["search-icon-btn"]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
                        </svg>
                    </button>
                </div>
            </form>
        </section>
    );
};
