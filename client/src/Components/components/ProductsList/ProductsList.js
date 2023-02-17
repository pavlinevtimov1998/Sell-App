import { useState } from "react";

import styles from "./ProductsList.module.css";
import { ProductItem } from "../ProductItem/ProductItem";
import { useProducts } from "../../../Hooks/useProducts";

export const ProductsList = ({ products, title }) => {
    const { productsState, changeLikeState } = useProducts(products);

    return (
        <section className={styles["products-wraper"]}>
            <header className={styles["products-header"]}>
                <h2>{title || "Recent Offers"}</h2>
            </header>
            <div
                style={{
                    justifyContent: products.length === 0 ? "center" : "flex-start",
                }}
                className={styles["product-cards-container"]}
            >
                {productsState.length === 0 && (
                    <h1 className={styles["no-results"]}>No Results...</h1>
                )}
                {productsState.map((p) => (
                    <ProductItem
                        key={p._id}
                        product={p}
                        changeState={changeLikeState}
                    />
                ))}
            </div>
        </section>
    );
};
