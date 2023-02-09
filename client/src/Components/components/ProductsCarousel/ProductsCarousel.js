import { useState } from "react";
import { ProductItem } from "../ProductItem/ProductItem";

import styles from "./ProductsCarousel.module.css";

export const ProductsCarousel = ({ products }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slidesNumber = () => {
        const width = window.innerWidth;

        const mathOperation = (num) => Math.floor(products.length / num) - 1;

        if (width <= 400) {
            return mathOperation(1);
        } else if (width <= 650) {
            return mathOperation(2);
        } else if (width <= 900) {
            return mathOperation(3);
        } else {
            return mathOperation(4);
        }
    };

    const left = () => {
        setCurrentSlide((state) => (state > 0 ? state - 1 : slidesNumber()));
    };

    const right = () => {
        setCurrentSlide((state) =>
            state + 1 > slidesNumber() ? 0 : state + 1
        );
    };

    return (
        <div className={styles["products-carousel-container"]}>
            <div className={styles["asd"]}>
                <div
                    className={styles["products-container"]}
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {products.map((p) => (
                        <ProductItem key={p._id} product={p} />
                    ))}
                </div>
            </div>
            <div className={styles["arrows"]}>
                <button type="button" onClick={left}>
                    <svg
                        width={20}
                        height={20}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z" />
                    </svg>
                </button>
                <button type="button" onClick={right}>
                    <svg
                        width={20}
                        height={20}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
