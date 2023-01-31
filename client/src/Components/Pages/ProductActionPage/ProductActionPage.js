import { useFetch } from "../../../Hooks/useFetch";

import styles from "./ProductActionPage.module.css";

import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";

import { getAllCategories } from "../../../Services/categoriesService";
import { useEffect, useState } from "react";
import { CategoriesFormModal } from "../../components/CategoriesFormModal/CategoriesFormModal";
import { CategorySelectBtn } from "../../components/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";

// const getData = (action) => action === "create" ? getAllCategories() : ''

export const ProductActionPage = ({ action }) => {
    const { isLoading, data } = useFetch(getAllCategories);
    const [categories, setCategories] = useState([]);
    const [inputData, setInputData] = useState({
        title: "",
        category: { text: "", img: "" },
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

    const chooseCategoryHandler = (
        e,
        { categoryTitle, image, subcategoryTitle }
    ) => {
        setInputData((state) => ({
            ...state,
            category: {
                text: `${categoryTitle}, ${subcategoryTitle}`,
                img: image,
            },
        }));
    };

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
                                <CategorySelectBtn
                                    categories={categories}
                                    
                                    chooseCategoryHandler={
                                        chooseCategoryHandler
                                    }
                                />

                                <p className={styles["error"]}>
                                    Category is required!
                                </p>
                            </div>
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
                                <span>Edit</span>
                            </button>
                            <button type="submit">
                                <span>Add</span>
                            </button>
                        </div>
                    </form>
                </section>
            )}
        </MainLayout>
    );
};
