import { useState } from "react";
import styles from "./Carousel.module.css";

export const Carousel = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const changeImgHandler = (operator) => {
        const helper = {
            "+": () =>
                setSelectedIndex(
                    (prevIndex) => (prevIndex + 1) % images.length
                ),
            "-": () =>
                setSelectedIndex((prevIndex) =>
                    prevIndex - 1 > -1 ? prevIndex - 1 : images.length - 1
                ),
        };

        helper[operator]();
    };

    const onDotClick = (index) => setSelectedIndex(index);

    return (
        <section className={styles["carousel"]}>
            <div className={styles["carousel-container"]}>
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={`${styles["img-container"]} ${
                            styles[selectedIndex === i ? "active" : ""]
                        }`}
                    >
                        <img
                            key={i}
                            src={img}
                            alt="ProductImage"
                            className={`${styles["img"]} ${styles["fade"]}`}
                        />
                    </div>
                ))}
                <div className={styles["carousel-dot-container"]}>
                    {images.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => onDotClick(i)}
                            className={`${styles["dot"]} ${
                                styles[selectedIndex === i ? "dot-active" : ""]
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => changeImgHandler("-")}
                    type="button"
                    className={styles["arrow-left"]}
                >
                    <svg
                        className={styles["arrow-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                </button>
                <button
                    onClick={() => changeImgHandler("+")}
                    type="button"
                    className={styles["arrow-right"]}
                >
                    <svg
                        className={styles["arrow-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                </button>
            </div>
        </section>
    );
};
