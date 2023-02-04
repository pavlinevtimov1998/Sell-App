import { useContext, useEffect, useRef, useState } from "react";
import { useFetch } from "../../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../../Contexts/FormContext";
import { ErrorContext } from "../../../Contexts/ErrorContext";

import styles from "./ProductActionPage.module.css";

import { Spinner } from "../../components/Spinner/Spinner";
import { CategorySelectBtn } from "../../components/ProductForm/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";
import { ProductTypeOptions } from "../../components/ProductForm/ProductTypeOptions/ProductTypeOptions";
import { getAllCategories } from "../../../Services/categoriesService";
import { createProduct } from "../../../Services/productsService";
import * as validators from "../../../Utils/validators";
import { FormButton } from "../../components/FormButton/FormButton";
import { ImagesField } from "../../components/ProductForm/ImagesField/ImagesField";

export const ProductActionPage = ({ action }) => {
    const { isLoading, data } = useFetch(getAllCategories);
    const [isSubmited, setIsSubmited] = useState(false);
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
    const [typeAndCondition, setTypeAndCondition] = useState({
        type: "",
        condition: "",
    });
    const [errors, setFormErrors] = useState({
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
        type: {
            required: false,
        },
        condition: {
            required: false,
        },
    });
    const imagesInputRef = useRef(null);
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

    const chooseCategoryHandler = (category) => {
        setSelectedCategory(category);
        setFormErrors((state) => ({ ...state, category: { required: false } }));
    };

    const clearCategoryHandler = () => setSelectedCategory(null);

    const selectTypeAndCondition = (name, value) => {
        setTypeAndCondition((state) => {
            return state[name] === value
                ? { ...state, [name]: "" }
                : { ...state, [name]: value };
        });
        setFormErrors((state) => ({ ...state, [name]: { required: false } }));
    };
    const addImages = () => {
        imagesInputRef.current.click();
    };

    const imagesHandler = (e) => {
        setInputData((state) => ({
            ...state,
            [e.target.name]: e.target.files,
        }));
        setFormErrors((state) => ({ ...state, images: { required: false } }));
    };

    const inputError = (name) =>
        Object.values(errors[name]).includes(true) ? "input-error" : "";

    const submitHandler = (e) => {
        e.preventDefault();

        const allData = {
            ...inputData,
            category: selectedCategory?.category?.title || "",
            subcategory: selectedCategory?.subcategory || "",
            ...typeAndCondition,
        };

        if (validators.hasEmpty(allData, errors, setFormErrors)) {
            return;
        }

        const formData = new FormData();
        Object.entries(allData).forEach(([key, value]) => {
            if (key === "images") {
                [...value].forEach((img) =>
                    formData.append("images", img, img.name)
                );
            }
            formData.append(key, value);
        });

        setIsSubmited(true);
        createProduct(formData)
            .then((res) => {
                console.log(res);
                navigate(`/details/${res._id}`, { replace: true });
            })
            .catch((err) => {
                setIsSubmited(false);
                setErrors({ message: err.message, hasError: true });
            });
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <FormContext.Provider
                    value={{
                        chooseCategoryHandler,
                        clearCategoryHandler,
                        categories,
                        selectedCategory,
                        selectTypeAndCondition,
                        addImages,
                        imagesHandler,
                        imagesInputRef,
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
                                    <h4 className={styles["form-field-title"]}>
                                        What do you offer?
                                    </h4>
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
                                            className={`${
                                                styles["title-input"]
                                            } ${inputError("title")}`}
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
                                            <p className="error">
                                                Title is required!
                                            </p>
                                        )}
                                        {errors.title.minLength && (
                                            <p className="error">
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
                                            <p className="error">
                                                Category is required!
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {action === "create" && (
                                    <ImagesField
                                        error={errors.images.required}
                                    />
                                )}

                                <div className={styles["description-field"]}>
                                    <h4 className={styles["form-field-title"]}>
                                        Description
                                    </h4>
                                    <textarea
                                        className={`${
                                            styles["description-input"]
                                        } ${inputError("description")}`}
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
                                        <p className={"error"}>
                                            Description is required!
                                        </p>
                                    )}
                                    {errors.description.minLength && (
                                        <p className="error">
                                            Description should be at least 25
                                            characters!
                                        </p>
                                    )}
                                </div>
                                <ProductTypeOptions
                                    selectTypeAndCondition={
                                        selectTypeAndCondition
                                    }
                                    error={{
                                        type: errors.type.required,
                                        condition: errors.condition.required,
                                    }}
                                />
                                <div className={styles["price-field"]}>
                                    <h4 className={styles["form-field-title"]}>
                                        Price
                                    </h4>
                                    <input
                                        className={`${
                                            styles["price-input"]
                                        } ${inputError("price")}`}
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
                                        <p className="error">
                                            Price is required!
                                        </p>
                                    )}
                                    {errors.price.minNum && (
                                        <p className="error">
                                            Price should be minimum 0.01$!
                                        </p>
                                    )}
                                </div>
                                <div className={styles["location-field"]}>
                                    <h4 className={styles["form-field-title"]}>
                                        Location
                                    </h4>
                                    <input
                                        className={`${
                                            styles["location-input"]
                                        } ${inputError("location")}`}
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
                                        <p className="error">
                                            Location is required!
                                        </p>
                                    )}
                                </div>
                                <div className={styles["contacts-field"]}>
                                    <h4 className={styles["form-field-title"]}>
                                        Contact
                                    </h4>
                                    <div className={styles["phone"]}>
                                        <label
                                            className={styles["label"]}
                                            htmlFor="number"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            className={`${
                                                styles["phone-input"]
                                            } ${inputError("phoneNumber")}`}
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
                                            <p className="error">
                                                Phone number is required!
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className={styles["btn-container"]}>
                                    {isSubmited && (
                                        <span
                                            className={styles["loader"]}
                                        ></span>
                                    )}
                                    {!isSubmited && (
                                        <FormButton
                                            content={
                                                action === "create"
                                                    ? "Add"
                                                    : "Edit"
                                            }
                                        >
                                            <svg
                                                width={20}
                                                height={20}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                            </svg>
                                        </FormButton>
                                    )}
                                </div>
                            </form>
                        </div>
                    </section>
                </FormContext.Provider>
            )}
        </>
    );
};
