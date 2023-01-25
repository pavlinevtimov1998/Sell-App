import { useParams } from "react-router-dom";
import { useFetch } from "../../../Hooks/useFetch";

import styles from "./DetailsPage.module.css";

import { getOneProduct } from "../../../Services/productsService";

import { Carousel } from "../../components/Carousel/Carousel";
import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";

export const DetailsPage = () => {
    const { productId } = useParams();
    const { isLoading, data, error } = useFetch(
        () => getOneProduct(productId),
        [productId]
    );

    console.log(data);

    return (
        <MainLayout>
            {isLoading ? (
                <Spinner />
            ) : (
                <main className={styles["content"]}>
                    <section className={styles["wrapper"]}>
                        <Carousel images={data.images} />
                        <article className={styles["info-container"]}>
                            <h3 className={styles["user-name"]}>Seller</h3>
                            <div className={styles["user-info"]}>
                                <div className={styles["user-photo"]}>
                                    <img
                                        src="/assets/images/user-default.png"
                                        alt="userphoto"
                                    />
                                </div>
                                <div className={styles["info"]}>
                                    <p className={styles["email"]}>
                                        {data._ownerId.email}
                                    </p>
                                </div>
                            </div>
                            <div className={styles["location"]}>
                                <h3>location:</h3>
                                <div>{data.town}</div>
                            </div>
                        </article>
                    </section>
                    <section className={styles["prod-info"]}>
                        <article>
                            <p>Added on {data.createdAt}</p>
                        </article>
                        <article className={styles["title"]}>
                            <h2>{data.title}</h2>
                        </article>
                        <article className={styles["price"]}>
                            <h1>{data.price}$</h1>
                        </article>
                        <article className={styles["description"]}>
                            <h3>Description</h3>
                            <p>{data.description}</p>
                        </article>
                        <div className={styles["border"]} />
                        <article className={styles["report action"]}>
                            <a href="/">
                                <span>Report</span>
                            </a>
                        </article>
                        <article className={styles["owner action"]}>
                            <button className={styles["edit"]}>
                                <span>Edit</span>
                            </button>
                            <button className={styles["delete"]}>
                                <span>Delete</span>
                            </button>
                        </article>
                    </section>
                </main>
            )}
        </MainLayout>
    );
};
