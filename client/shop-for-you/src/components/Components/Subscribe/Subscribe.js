import styles from "./Subscribe.module.css";

export const Subscribe = () => {
    return (
        <section className={styles["subscribe-section"]}>
            <div className={styles["subscribe-container"]}>
                <h1>Be one of the first!</h1>
                <p>
                    Subscribe for exclusive discounts, news, events, and more.
                </p>
                <form>
                    <div className={`form-group ${styles["group"]}`}>
                        <input
                            type="text"
                            className={`form-control ${styles['input']}`}
                            id="formGroupExampleInput"
                            placeholder="Enter your e-mail"
                        />
                        <button type="submit" className={`btn btn-dark ${styles['btn-sub']}`}>
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
