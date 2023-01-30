import { useFetch } from "../../../Hooks/useFetch";

import styles from "./ProductActionPage.module.css";

import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";

import { getAllCategories } from "../../../Services/categoriesService";
import { useEffect, useState } from "react";
import { CategoriesFormModal } from "../../components/CategoriesFormModal/CategoriesFormModal";

// const getData = (action) => action === "create" ? getAllCategories() : ''

export const ProductActionPage = ({ action }) => {
    const { isLoading, data } = useFetch(getAllCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [inputData, setInputData] = useState({
        title: "",
        category: "",
        subcategory: "",
        description: "",
        price: "",
        location: "",
        contacts: "",
    });
    const [errors, setErrors] = useState({
        title: {
            required: false,
            minLength: false,
        },
        category: {
            required: false,
        },
        subcategory: {
            required: false,
        },
        description: {
            required: false,
            minLength: false,
        },
        price: {
            required: false,
            minPrice: false,
        },
        location: {
            required: false,
        },
        contacts: "",
    });

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const openCategoriesModal = () => setIsModalOpen(true);

    return (
        <MainLayout>
            {isLoading ? (
                <Spinner />
            ) : (
                <section className={styles["section"]}>
                    <div className={styles["section-title"]}>
                        <h1>Add Product</h1>
                    </div>
                    <form className={styles["form"]}>
                        <div
                            className={`${styles["offer"]} ${styles["field"]}`}
                        >
                            <h4>What do you offer?</h4>
                            <div className={styles["title"]}>
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Example: iPhone 14 with guarantee..."
                                />
                                <p className={styles["error"]}>
                                    Title is required!
                                </p>
                                <p className={styles["error"]}>
                                    Title should be at least 6 characters!
                                </p>
                            </div>
                            <div className={styles["category"]}>
                                <label htmlFor="category">Category</label>
                                <div className={styles["select-wrapper"]}>
                                    <button
                                        className={styles["select-btn"]}
                                        type="button"
                                        title="Choose Category"
                                        onClick={openCategoriesModal}
                                    >
                                        <div className={styles["content"]}>
                                            <p>Choose Category</p>
                                            <svg
                                                className={
                                                    styles["select-icon"]
                                                }
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                            >
                                                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                <p className={styles["error"]}>
                                    Category is required!
                                </p>
                            </div>

                            <CategoriesFormModal
                                isModalOpen={isModalOpen}
                                categories={categories}
                            />
                        </div>
                        {action === "create" && (
                            <div
                                className={`${styles["photo"]} ${styles["field"]}`}
                            >
                                <h4>Photos</h4>
                                <div className={styles["photos-container"]}>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            placeholder="Add photo"
                                        />
                                        <button
                                            type="button"
                                            className={styles["image-upload"]}
                                        >
                                            <span
                                                className={styles["img-name"]}
                                            >
                                                Add photo
                                            </span>
                                        </button>
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            placeholder="Add photo"
                                        />
                                        <button
                                            type="button"
                                            className={styles["image-upload"]}
                                        >
                                            <mat-icon>upload_file</mat-icon>
                                            <span
                                                className={styles["img-name"]}
                                            >
                                                Add photo
                                            </span>
                                        </button>
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            placeholder="Add photo"
                                        />
                                        <button
                                            type="button"
                                            className={styles["image-upload"]}
                                        >
                                            <span
                                                className={styles["img-name"]}
                                            >
                                                Add photo
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div
                            className={`${styles["description"]} ${styles["field"]}`}
                        >
                            <h4>Description</h4>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Write some description..."
                            />
                            <p className={styles["error"]}>
                                Description is required!
                            </p>
                            <p className={styles["error"]}>
                                Description should be at least 25 characters!
                            </p>
                        </div>
                        <div
                            className={`${styles["price"]} ${styles["field"]}`}
                        >
                            <h4>Price</h4>
                            <input
                                formcontrolname="price"
                                type="number"
                                name="price"
                                placeholder="Add price"
                                id="price"
                            />
                            <p className={styles["error"]}>
                                Price is required!
                            </p>
                            <p className={styles["error"]}>
                                Price should be minimum 0.01$!
                            </p>
                        </div>
                        <div
                            className={`${styles["location"]} ${styles["field"]}`}
                        >
                            <h4>Location</h4>
                            <input
                                formcontrolname="location"
                                type="text"
                                name="location"
                                placeholder="Town"
                                id="location"
                            />
                            <p className={styles["error"]}>
                                Location is required!
                            </p>
                        </div>
                        <div
                            className={`${styles["contacts"]} ${styles["field"]}`}
                        >
                            <h4>Contact</h4>
                            <div className={styles["number"]}>
                                <label htmlFor="number">Phone number</label>
                                <input
                                    type="number"
                                    name="number"
                                    id="number"
                                />
                            </div>
                        </div>
                        <div className={styles["btn-container"]}>
                            <button type="submit">
                                <mat-icon>edit</mat-icon>
                                <span>Edit</span>
                            </button>
                            <button type="submit">
                                <mat-icon>add_circle</mat-icon>
                                <span>Add</span>
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </MainLayout>
    );
};
