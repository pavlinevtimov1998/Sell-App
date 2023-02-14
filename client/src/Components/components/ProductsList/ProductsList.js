import { useState } from "react";

import styles from "./ProductsList.module.css";
import { ProductItem } from "../ProductItem/ProductItem";
import { useProducts } from "../../../Hooks/useProducts";

export const ProductsList = ({ products }) => {
    const { productsState, changeLikeState } = useProducts(products);

    return (
        <section className={styles["products-wraper"]}>
            <header className={styles["products-header"]}>
                <h2>Recent Offers</h2>
            </header>
            <div className={styles["product-cards-container"]}>
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
