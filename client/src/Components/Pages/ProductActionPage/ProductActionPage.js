import { useEffect, useState } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { FormContext } from "../../../Contexts/FormContext";

import styles from "./ProductActionPage.module.css";

import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";
import { CategorySelectBtn } from "../../components/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";
import * as validators from "../../../Utils/validators";
import { getAllCategories } from "../../../Services/categoriesService";

// const getData = (action) => action === "create" ? getAllCategories() : ''

export const ProductActionPage = ({ action }) => {
    const { isLoading, data } = useFetch(getAllCategories);
    const [categories, setCategories] = useState([]);
    const [inputData, setInputData] = useState({
        title: "",
        price: "",
        location: "",
        contacts: "",
        description: "",
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [errors, setErrors] = useState({
        title: {
            required: false,
            minLength: false,
        },
        category: {
            required: false,
        },
        description: {
            required: false,
            minLength: false,
        },
        price: {
            required: false,
            minNum: false,
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

    const onChangeHandler = (e) =>
        setInputData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));

    const chooseCategoryHandler = (category) => setSelectedCategory(category);

    const clearCategoryHandler = () => setSelectedCategory(null);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <MainLayout>
            {isLoading ? (
                <Spinner />
            ) : (
                <FormContext.Provider
                    value={{
                        chooseCategoryHandler,
                        clearCategoryHandler,
                        categories,
                        selectedCategory,
                    }}
                >
                    <section className={styles["section"]}>
                        <div className={styles["section-title"]}>
                            <h1>Add Product</h1>
                        </div>
                        <form
                            onSubmit={submitHandler}
                            className={styles["form"]}
                        >
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
                                        value={inputData.title}
                                        onChange={onChangeHandler}
                                        onBlur={(e) => {
                                            validators.lengthValidator(
                                                6,
                                                e.target.name,
                                                inputData.title,
                                                setErrors
                                            );
                                            validators.requiredValidator(
                                                e.target.name,
                                                inputData.title,
                                                setErrors
                                            );
                                        }}
                                    />
                                    {errors.title.required && (
                                        <p className={styles["error"]}>
                                            Title is required!
                                        </p>
                                    )}
                                    {errors.title.minLength && (
                                        <p className={styles["error"]}>
                                            Title should be at least 6
                                            characters!
                                        </p>
                                    )}
                                </div>
                                <div className={styles["category"]}>
                                    <label htmlFor="category">Category</label>
                                    <CategorySelectBtn />

                                    {errors.category.required && (
                                        <p className={styles["error"]}>
                                            Category is required!
                                        </p>
                                    )}
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
                                                className={
                                                    styles["image-upload"]
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles["img-name"]
                                                    }
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
                                                className={
                                                    styles["image-upload"]
                                                }
                                            >
                                                <mat-icon>upload_file</mat-icon>
                                                <span
                                                    className={
                                                        styles["img-name"]
                                                    }
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
                                                className={
                                                    styles["image-upload"]
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles["img-name"]
                                                    }
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
                                    value={inputData.description}
                                    onChange={onChangeHandler}
                                    onBlur={(e) => {
                                        validators.lengthValidator(
                                            25,
                                            e.target.name,
                                            inputData.description,
                                            setErrors
                                        );
                                        validators.requiredValidator(
                                            e.target.name,
                                            inputData.description,
                                            setErrors
                                        );
                                    }}
                                />
                                {errors.description.required && (
                                    <p className={styles["error"]}>
                                        Description is required!
                                    </p>
                                )}
                                {errors.description.minLength && (
                                    <p className={styles["error"]}>
                                        Description should be at least 25
                                        characters!
                                    </p>
                                )}
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
                                    value={inputData.price}
                                    onChange={onChangeHandler}
                                    onBlur={(e) => {
                                        validators.minNumberValidator(
                                            0.01,
                                            e.target.name,
                                            inputData.price,
                                            setErrors
                                        );
                                        validators.requiredValidator(
                                            e.target.name,
                                            inputData.price,
                                            setErrors
                                        );
                                    }}
                                />

                                {errors.price.required && (
                                    <p className={styles["error"]}>
                                        Price is required!
                                    </p>
                                )}
                                {errors.price.minNum && (
                                    <p className={styles["error"]}>
                                        Price should be minimum 0.01$!
                                    </p>
                                )}
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
                                    value={inputData.location}
                                    onChange={onChangeHandler}
                                    onBlur={(e) =>
                                        validators.requiredValidator(
                                            e.target.name,
                                            inputData.location,
                                            setErrors
                                        )
                                    }
                                />

                                {errors.location.required && (
                                    <p className={styles["error"]}>
                                        Location is required!
                                    </p>
                                )}
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
                                        value={inputData.price}
                                        onChange={onChangeHandler}
                                        onBlur={(e) =>
                                            validators.requiredValidator(
                                                e.target.name,
                                                inputData.price,
                                                setErrors
                                            )
                                        }
                                    />
                                    {errors.location.required && (
                                        <p className={styles["error"]}>
                                            Phone number is required!
                                        </p>
                                    )}
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
                </FormContext.Provider>
            )}
        </MainLayout>
    );
};
