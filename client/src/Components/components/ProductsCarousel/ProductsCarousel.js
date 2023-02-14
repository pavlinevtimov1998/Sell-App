import { useState } from "react";
import { useProducts } from "../../../Hooks/useProducts";
import { ProductItem } from "../ProductItem/ProductItem";

import styles from "./ProductsCarousel.module.css";

export const ProductsCarousel = ({ products, children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { productsState, changeLikeState } = useProducts(products);

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
        <section className={styles["more-products"]}>
            <header className={styles["more-products-header"]}>
                <h4 className={styles["more-products-title"]}>{children}</h4>
            </header>
            <div className={styles["products-carousel-container"]}>
                <div className={styles["asd"]}>
                    <div
                        className={styles["products-container"]}
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {productsState.map((p) => (
                            <ProductItem
                                key={p._id}
                                product={p}
                                changeState={changeLikeState}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles["arrows"]}>
                    <button type="button" onClick={left}>
                        <svg
                            width={30}
                            height={30}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                        </svg>
                    </button>
                    <button type="button" onClick={right}>
                        <svg
                            width={30}
                            height={30}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};
