import { useState } from "react";

import styles from "./ProductsList.module.css";
import { ProductItem } from "../ProductItem/ProductItem";

export const ProductsList = ({ products }) => {
    const [productsState, setProductsState] = useState(products);

    const changeState = (productId, userId, isLike) =>
        setProductsState((state) => {
            return state.map((p) => {
                if (p._id === productId) {
                    return isLike
                        ? { ...p, favorites: [...p.favorites, userId] }
                        : {
                              ...p,
                              favorites: p.favorites.filter(
                                  (id) => id !== userId
                              ),
                          };
                }
                return p;
            });
        });

    return (
        <section className={styles["products-wraper"]}>
            <header className={styles["products-header"]}>
                <h2>Recent Offers</h2>
            </header>
            <div className={styles["product-cards"]}>
                {productsState.map((p) => (
                    <ProductItem
                        key={p._id}
                        product={p}
                        changeState={changeState}
                    />
                ))}
            </div>
        </section>
    );
};
