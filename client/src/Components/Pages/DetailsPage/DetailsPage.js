import { useEffect } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useParams } from "react-router-dom";

import styles from "./DetailsPage.module.css";

import { getOneProduct } from "../../../Services/productsService";

import { Carousel } from "../../components/Carousel/Carousel";
import { Spinner } from "../../components/Spinner/Spinner";
import { ProductDescription } from "../../components/ProductDescription/ProductDescription";
import { Map } from "../../components/Map/Map";
import { dateParser } from "../../../Utils/util";

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
                    <div className={styles["wrapper"]}>
                        <div className={styles["main-column"]}>
                            <Carousel images={data.product.images} />
                            <ProductDescription data={data.product} />
                            <section className={styles["message-container"]}>
                                <header className={styles["message-header"]}>
                                    <h4 className={styles["message-title"]}>
                                        Send Message
                                    </h4>
                                </header>
                                <form className={styles["message-form"]}>
                                    <textarea
                                        className={styles["form-textarea"]}
                                        name="message"
                                        cols="30"
                                        rows="10"
                                        placeholder="Write your message..."
                                    ></textarea>
                                    <button className={styles["form-btn"]}>
                                        <span className={styles["btn-content"]}>
                                            Send
                                        </span>
                                        <svg
                                            width={20}
                                            height={20}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                                        </svg>
                                    </button>
                                </form>
                            </section>
                        </div>
                        <aside className={styles["aside"]}>
                            <article className={styles["info-container"]}>
                                <h3 className={styles["title"]}>Seller Info</h3>
                                <div className={styles["user-info"]}>
                                    <div className={styles["user-photo"]}>
                                        <img
                                            src="/user-default.png"
                                            alt="userphoto"
                                            className={styles["img"]}
                                        />
                                    </div>
                                    <div className={styles["info"]}>
                                        <p
                                            title={data.product._ownerId.email}
                                            className={styles["email"]}
                                        >
                                            {data.product._ownerId.email}
                                        </p>
                                        <p className={styles["timestamp"]}>
                                            <span>In Sell-App from </span>
                                            <span className={styles["date"]}>
                                                {dateParser(
                                                    data.product._ownerId
                                                        .createdAt
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className={styles["message-btn"]}
                                >
                                    <span
                                        className={
                                            styles["message-btn-content"]
                                        }
                                    >
                                        Send Message
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        width={20}
                                        height={20}
                                    >
                                        <path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.98c0 9.836 11.02 15.55 19.12 9.7l124.9-93.68h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM464 352c0 8.75-7.25 16-16 16h-160l-80 60v-60H64c-8.75 0-16-7.25-16-16V64c0-8.75 7.25-16 16-16h384c8.75 0 16 7.25 16 16V352z" />
                                    </svg>
                                </button>
                            </article>
                            <article className={styles["location"]}>
                                <div className={styles["map"]}>
                                    <Map
                                        location={data.product.location}
                                        GOOGLE_KEY={data.GOOGLE_KEY}
                                    />
                                </div>
                            </article>
                        </aside>
                    </div>
                </main>
            )}
        </>
    );
};
{
}
