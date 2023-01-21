import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles["footer"]}>
            <section className={styles["articles"]}>
                <article>
                    <ul>
                        <li>
                            <a href="/">SellApp Blog</a>
                        </li>
                        <li>
                            <a href="/">Mobile Aplications</a>
                        </li>
                        <li>
                            <a href="/">Help</a>
                        </li>
                        <li>
                            <a href="/">Promo posts</a>
                        </li>
                        <li>
                            <a href="/">Terms and Conditions</a>
                        </li>
                        <li>
                            <a href="/">Biscuits</a>
                        </li>
                    </ul>
                </article>
                <article>
                    <ul>
                        <li>
                            <a href="/">Popular searches</a>
                        </li>
                        <li>
                            <a href="/">Delivery</a>
                        </li>
                        <li>
                            <a href="/">How it works?</a>
                        </li>
                    </ul>
                </article>
                <article>
                    <ul className={styles["social-media"]}>
                        <li>
                            <a href="/">icon</a>
                        </li>
                        <li>
                            <a href="/">icon</a>
                        </li>
                    </ul>
                </article>
            </section>
        </footer>
    );
};
