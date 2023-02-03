import { useContext, useEffect, useRef, useState } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { FormContext } from "../../../Contexts/FormContext";

import styles from "./ProductActionPage.module.css";

import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";
import { CategorySelectBtn } from "../../components/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";
import * as validators from "../../../Utils/validators";
import { getAllCategories } from "../../../Services/categoriesService";
import { createProduct } from "../../../Services/productsService";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../../Contexts/ErrorContext";
import { ProductTypeOptions } from "../../components/ProductForm/ProductTypeOptions/ProductTypeOptions";

// const getData = (action) => action === "create" ? getAllCategories() : ''

export const ProductActionPage = ({ action }) => {
    const { isLoading, setIsLoading, data } = useFetch(getAllCategories);
    const { setErrors } = useContext(ErrorContext);
    const [categories, setCategories] = useState([]);
    const [inputData, setInputData] = useState({
        title: "",
        price: "",
        images: "",
        location: "",
        phoneNumber: "",
        description: "",
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [errors, setFormErrors] = useState({
        title: {
            required: false,
            minLength: false,
        },
        category: {
            required: false,
        },
        images: {
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
        phoneNumber: {
            required: false,
        },
    });
    const inputRef = useRef(null);
    const navigate = useNavigate();

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

        if (
            validators.hasEmpty(
                {
                    ...inputData,
                    category: selectedCategory?.category?.title || "",
                },
                errors,
                setFormErrors
            )
        ) {
            return;
        }

        const formData = new FormData();
        Object.entries(inputData).forEach(([key, value]) => {
            if (key === "images") {
                [...value].forEach((img) =>
                    formData.append("images", img, img.name)
                );
            }
            formData.append(key, value);
        });
        formData.append("category", selectedCategory.category?.title);
        formData.append("subcategory", selectedCategory.subcategory);

        setIsLoading(true);
        createProduct(formData)
            .then((res) => {
                console.log(res);
                navigate(res._id, { replace: true });
            })
            .catch((err) =>
                setErrors({ message: err.message, hasError: true })
            );
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
                        <div className={styles["main-container"]}>
                            <header className={styles["header"]}>
                                <h1>Add Product</h1>
                            </header>
                            <form
                                onSubmit={submitHandler}
                                className={styles["form"]}
                            >
                                <div className={styles["offer-field"]}>
                                    <h4>What do you offer?</h4>
                                    <div className={styles["title"]}>
                                        <label
                                            className={styles["label"]}
                                            htmlFor="title"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            className={styles["title-input"]}
                                            placeholder="Example: iPhone 14 with guarantee..."
                                            value={inputData.title}
                                            onChange={onChangeHandler}
                                            onBlur={(e) => {
                                                validators.lengthValidator(
                                                    6,
                                                    e.target.name,
                                                    inputData.title,
                                                    setFormErrors
                                                );
                                                validators.requiredValidator(
                                                    e.target.name,
                                                    inputData.title,
                                                    setFormErrors
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
                                        <label
                                            className={styles["label"]}
                                            htmlFor="category"
                                        >
                                            Category
                                        </label>
                                        <CategorySelectBtn />

                                        {errors.category.required && (
                                            <p className={styles["error"]}>
                                                Category is required!
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {action === "create" && (
                                    <div className={styles["images-field"]}>
                                        <h4>Photos</h4>
                                        <div
                                            className={
                                                styles["photos-container"]
                                            }
                                        >
                                            <div
                                                className={
                                                    styles["image-input-field"]
                                                }
                                            >
                                                <input
                                                    className={
                                                        styles["img-input"]
                                                    }
                                                    type="file"
                                                    accept="image/png, image/jpeg"
                                                    multiple
                                                    name="images"
                                                    ref={inputRef}
                                                    onChange={imagesHandler}
                                                />
                                                <button
                                                    type="button"
                                                    className={
                                                        styles["img-btn"]
                                                    }
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
                                            {errors.images.required && (
                                                <p className={styles["error"]}>
                                                    Images are required!
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className={styles["description-field"]}>
                                    <h4>Description</h4>
                                    <textarea
                                        className={styles["description-input"]}
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
                                                setFormErrors
                                            );
                                            validators.requiredValidator(
                                                e.target.name,
                                                inputData.description,
                                                setFormErrors
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
                                <ProductTypeOptions />
                                <div className={styles["price-field"]}>
                                    <h4>Price</h4>
                                    <input
                                        className={styles["price-input"]}
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
                                                setFormErrors
                                            );
                                            validators.requiredValidator(
                                                e.target.name,
                                                inputData.price,
                                                setFormErrors
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
                                <div className={styles["location-field"]}>
                                    <h4>Location</h4>
                                    <input
                                        className={styles["location-input"]}
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
                                                setFormErrors
                                            )
                                        }
                                    />

                                    {errors.location.required && (
                                        <p className={styles["error"]}>
                                            Location is required!
                                        </p>
                                    )}
                                </div>
                                <div className={styles["contacts-field"]}>
                                    <h4>Contact</h4>
                                    <div className={styles["phone"]}>
                                        <label
                                            className={styles["label"]}
                                            htmlFor="number"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            className={styles["phone-input"]}
                                            type="number"
                                            name="phoneNumber"
                                            id="number"
                                            value={inputData.phoneNumber}
                                            onChange={onChangeHandler}
                                            onBlur={(e) =>
                                                validators.requiredValidator(
                                                    e.target.name,
                                                    inputData.phoneNumber,
                                                    setFormErrors
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
                                <div className={styles["btns-container"]}>
                                    {action === "create" ? (
                                        <button
                                            className={styles["btn"]}
                                            type="submit"
                                        >
                                            <span
                                                className={
                                                    styles["sub-btn-content"]
                                                }
                                            >
                                                Add
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            className={styles["btn"]}
                                            type="submit"
                                        >
                                            <span
                                                className={
                                                    styles["sub-btn-content"]
                                                }
                                            >
                                                Edit
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </section>
                </FormContext.Provider>
            )}
        </MainLayout>
    );
};
