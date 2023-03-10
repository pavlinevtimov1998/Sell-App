import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../../Contexts/ErrorContext";
import { deleteProduct } from "../../../Services/productsService";

import { dateParser } from "../../../Utils/util";
import { SpinnerSmall } from "../SpinnerSmall/SpinnerSmall";

import styles from "./ProductDescription.module.css";

export const ProductDescription = ({ product, isOwner }) => {
    const { setMessage } = useContext(ErrorContext);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const hasNewLine = product.description.includes("\n");
    const createdAt = dateParser(product.createdAt);

    const deleteProductHandler = () => {
        setIsDeleting(true);
        deleteProduct(product._id)
            .then((result) => {
                setMessage({
                    message: "Successfull deleting!",
                    hasError: false,
                    hasMessage: true,
                });
                navigate("/", { replace: true });
            })
            .catch((error) =>
                setMessage({
                    message: error.message,
                    hasError: true,
                    hasMessage: true,
                })
            );
    };

    const description = product.description.split("\r\n");

    return (
        <section className={styles["prod-info"]}>
            <header className={styles["header"]}>
                <p className={styles["created-at"]}>Added on {createdAt}</p>
                <h1 className={styles["title"]}>{product.title}</h1>
            </header>
            <article className={styles["price"]}>
                <h3>{product.price} $</h3>
            </article>
            <article className={styles["type-container"]}>
                <p className={styles["type"]}>
                    <span className={styles["type-content"]}>
                        {product.type}
                    </span>
                </p>
                <p className={styles["type"]}>
                    <span className={styles["type-content"]}>
                        {product.condition}
                    </span>
                </p>
            </article>
            <article className={styles["description-container"]}>
                <h3 className={styles["description-title"]}>Description</h3>
                <ul>
                    {hasNewLine ? (
                        description.map((line, i) => {
                            return (
                                line && (
                                    <li key={i}>
                                        <br /> {line}
                                    </li>
                                )
                            );
                        })
                    ) : (
                        <p>{product.description}</p>
                    )}
                </ul>
            </article>
            <div className={styles["border"]} />
            {isOwner && (
                <article className={styles["action"]}>
                    <div className={styles["owner-btns"]}>
                        {isDeleting ? (
                            <SpinnerSmall width={25} height={25} />
                        ) : (
                            <>
                                <button className={styles["edit"]}>
                                    <svg
                                        className={styles["icon"]}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                    </svg>
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={deleteProductHandler}
                                    type="button"
                                    className={styles["delete"]}
                                >
                                    <svg
                                        className={styles["icon"]}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                    </svg>
                                    <span>Delete</span>
                                </button>
                            </>
                        )}
                    </div>
                </article>
            )}
        </section>
    );
};
