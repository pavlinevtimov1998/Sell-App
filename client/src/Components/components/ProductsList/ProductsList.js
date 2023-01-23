import styles from "./ProductsList.module.css";

import { ProductItem } from "../ProductItem/ProductItem";

export const ProductsList = ({ products }) => {
    return (
        <section className={styles["products-wraper"]}>
            <header className={styles["products-header"]}>
                <h2>Recent Offers</h2>
            </header>
            <div className={styles["product-cards"]}>
                    {products.map((p) => (
                        <ProductItem key={p._id} product={p} />
                    ))}
            </div>
        </section>
    );
};
