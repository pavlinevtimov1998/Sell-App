import { useEffect } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useParams } from "react-router-dom";

import styles from "./DetailsPage.module.css";

import { getOneProduct } from "../../../Services/productsService";

import { Carousel } from "../../components/Carousel/Carousel";
import { Spinner } from "../../components/Spinner/Spinner";
import { ProductDescription } from "../../components/ProductDescription/ProductDescription";
import { Map } from "../../components/Map/Map";

export const DetailsPage = () => {
    const { productId } = useParams();
    const { isLoading, data } = useFetch(
        () => getOneProduct(productId),
        [productId]
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <main className={styles["content"]}>
                    <section className={styles["wrapper"]}>
                        <Carousel images={data.product.images} />
                        <article className={styles["info-container"]}>
                            <h3 className={styles["user-name"]}>Seller Info</h3>
                            <div className={styles["user-info"]}>
                                <div className={styles["user-photo"]}>
                                    <img
                                        src="/user-default.png"
                                        alt="userphoto"
                                        className={styles["img"]}
                                    />
                                </div>
                                <div className={styles["info"]}>
                                    <p className={styles["email"]}>
                                        {data.product._ownerId.email}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["location"]}>
                                <h3>location:</h3>
                            </div>
                            <div className={styles["map"]}>
                                <Map
                                    location={data.product.location}
                                    GOOGLE_KEY={data.GOOGLE_KEY}
                                />
                            </div>
                        </article>
                    </section>
                    <ProductDescription data={data.product} />
                </main>
            )}
        </>
    );
};
