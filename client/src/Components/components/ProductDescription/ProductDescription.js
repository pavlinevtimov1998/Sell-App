import { dateParser } from "../../../Utils/util";
import styles from "./ProductDescription.module.css";

export const ProductDescription = ({ data }) => {
    const hasNewLine = data.description.includes("\n");
    const createdAt = dateParser(data.createdAt);

    return (
        <section className={styles["prod-info"]}>
            <article className={styles["created-at"]}>
                <p>Added on {createdAt}</p>
            </article>
            <article className={styles["title"]}>
                <h2>{data.title}</h2>
            </article>
            <article className={styles["price"]}>
                <h1>{data.price}$</h1>
            </article>
            <article className={styles["description"]}>
                <h3>Description</h3>
                <ul>
                    {hasNewLine ? (
                        data.description.split("\n").map((line, i) => (
                            <li key={i}>
                                <br /> {line}
                            </li>
                        ))
                    ) : (
                        <p>{data.description}</p>
                    )}
                </ul>
            </article>
            <div className={styles["border"]} />
            {/* <article className={styles["action"]}>
                <a className={styles["report-btn"]} href="/">
                    <svg
                        className={styles["icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" />
                    </svg>
                    <span>Report</span>
                </a>
            </article> */}
            <article className={styles["action"]}>
                <div className={styles["owner-btns"]}>
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
                    <button className={styles["delete"]}>
                        <svg
                            className={styles["icon"]}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>
            </article>
        </section>
    );
};
