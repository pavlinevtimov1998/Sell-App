import styles from "./Categories.module.css";

export const Categories = () => {
  return (
    <section id="men-women-categories">
      <div className={styles["categories-container"]}>
        <a className={styles["women-img-container"]} href="/">
          <img src="/images/women-section.png" alt="" />
          <div className={`${styles["categories-btn"]} ${styles["women"]}`}>
            <span>Women's</span>
          </div>
        </a>
        <a className={styles["men-img-container"]} href="/">
          <img src="/images/mens-section.png" alt="" />
          <div className={`${styles["categories-btn"]} ${styles["men"]}`}>
            <span>Men's</span>
          </div>
        </a>
      </div>
    </section>
  );
};
