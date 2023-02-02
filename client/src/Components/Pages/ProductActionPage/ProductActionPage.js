import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { FormContext } from "../../../Contexts/FormContext";

import styles from "./ProductActionPage.module.css";

import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";
import { CategorySelectBtn } from "../../components/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";
import * as validators from "../../../Utils/validators";
import { getAllCategories } from "../../../Services/categoriesService";
import { createProduct } from "../../../Services/productsService";

// const getData = (action) => action === "create" ? getAllCategories() : ''

export const ProductActionPage = ({ action }) => {
    const { isLoading, data } = useFetch(getAllCategories);
    const [categories, setCategories] = useState([]);
    const [inputData, setInputData] = useState({
        title: "",
        price: "",
        images: [],
        location: "",
        phoneNumber: "",
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
        images: {
            required: true,
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
        phoneNumber: "",
    });
    const inputRef = useRef(null);

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

    const addImages = () => {
        inputRef.current.click();
    };

    const imagesHandler = (e) =>
        setInputData((state) => ({
            ...state,
            [e.target.name]: e.target.files,
        }));

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(inputData).forEach(([key, value]) => {
            if (key === "images") {
                [...value].forEach((img) =>
                    formData.append("images", img, img.name)
                );
            }
            formData.append(key, value);
        });
        formData.append("category", selectedCategory.category.title);
        formData.append("subcategory", selectedCategory.subcategory);

        createProduct(formData).then((res) => console.log(res));
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
                                        <div className={styles["image-field"]}>
                                            <input
                                                className={styles["img-input"]}
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                multiple
                                                name="images"
                                                ref={inputRef}
                                                onChange={imagesHandler}
                                            />
                                            <button
                                                type="button"
                                                className={styles["img-btn"]}
                                                onClick={addImages}
                                            >
                                                <span
                                                    className={
                                                        styles[
                                                            "img-btn-content"
                                                        ]
                                                    }
                                                >
                                                    Click here to add one or
                                                    more photos ...
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
                                        name="phoneNumber"
                                        id="number"
                                        value={inputData.phoneNumber}
                                        onChange={onChangeHandler}
                                        onBlur={(e) =>
                                            validators.requiredValidator(
                                                e.target.name,
                                                inputData.phoneNumber,
                                                setErrors
                                            )
                                        }
                                    />
                                    {errors.phoneNumber.required && (
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
