import { useContext, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { ErrorContext } from "../../../Contexts/ErrorContext";
import { useFetch } from "../../../Hooks/useFetch";

import { getAllCategories } from "../../../Services/categoriesService";
import { getProducts } from "../../../Services/productsService";

import { CategorySelectBtn } from "../../components/ProductForm/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { Spinner } from "../../components/Spinner/Spinner";
import { SpinnerSmall } from "../../components/SpinnerSmall/SpinnerSmall";
import styles from "./ListingPage.module.css";

const getData = (params) => () =>
    Promise.all([getProducts(params), getAllCategories()]);

export const ListingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = createSearchParams(Object.fromEntries(searchParams));
    const { data, isLoading, setData } = useFetch(
        getData("?" + query.toString())
    );
    const [inputData, setInputData] = useState({
        title: "",
        fromPrice: "",
        toPrice: "",
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState({
        new: false,
        used: false,
    });
    const [searchLoading, setSearchLoading] = useState(false);
    const { setMessage } = useContext(ErrorContext);

    useEffect(() => {
        if (data) {
            const category = data[1].find((c) =>
                c.title
                    .toLocaleLowerCase()
                    .startsWith(
                        searchParams.get("category")?.toLocaleLowerCase()
                    )
            );

            if (!category) {
                return setSelectedCategory(null);
            }

            const subcategoryTitle =
                searchParams.get("subcategory") &&
                category.subcategories.find((s) =>
                    s.title
                        .toLocaleLowerCase()
                        .startsWith(
                            searchParams.get("subcategory")?.toLocaleLowerCase()
                        )
                );

            return setSelectedCategory({
                category: {
                    title: category.title,
                    image: category.image,
                },
                subcategory: subcategoryTitle?.title,
            });
        }
    }, [data, searchParams]);

    const chooseCategoryHandler = (category) => setSelectedCategory(category);

    const clearCategoryHandler = () => setSelectedCategory(null);

    const conditionHandler = (turnOn, turnOf) =>
        setSelectedCondition((state) => ({
            [turnOn]: !state[turnOn],
            [turnOf]: false,
        }));

    const onChangeHandler = (e) =>
        setInputData((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));

    const searchHandler = (e) => {
        e.preventDefault();

        const condition =
            Object.keys(selectedCondition).find(
                (k) => selectedCondition[k] === true
            ) || "";

        setSearchParams({
            category:
                selectedCategory?.category?.title?.toLocaleLowerCase() || "",
            subcategory: selectedCategory?.subcategory?.toLocaleLowerCase(),
            ...inputData,
            condition,
        });

        setSearchLoading(true);

        getProducts(
            "?" +
                createSearchParams({
                    category:
                        selectedCategory?.category?.title?.toLocaleLowerCase() ||
                        "",
                    subcategory:
                        selectedCategory?.subcategory?.toLocaleLowerCase(),
                    ...inputData,
                    condition,
                }).toString()
        )
            .then((result) => {
                setData((state) => [result, state[1]]);
                setSearchLoading(false);
            })
            .catch((err) =>
                setMessage({
                    message: err.message,
                    hasError: true,
                    hasMessage: true,
                })
            );
    };
    return isLoading ? (
        <Spinner />
    ) : (
        <div className={styles["wrapper"]}>
            <div className={styles["form-container"]}>
                <form
                    onSubmit={searchHandler}
                    className={styles["filter-form"]}
                >
                    <h1 className={styles["title"]}>Filters</h1>
                    <div className={styles["filters"]}>
                        <div className={styles["categories"]}>
                            <p className={styles["category-title"]}>Category</p>
                            <CategorySelectBtn
                                background="#fff"
                                categories={data[1]}
                                selectedCategory={selectedCategory}
                                chooseCategoryHandler={chooseCategoryHandler}
                                clearCategoryHandler={clearCategoryHandler}
                            />
                        </div>
                        <div className={styles["price"]}>
                            <p className={styles["price-title"]}>Price</p>
                            <div className={styles["price-input-container"]}>
                                <input
                                    type="number"
                                    placeholder="From"
                                    name="fromPrice"
                                    className={styles["price-input"]}
                                    value={inputData.fromPrice}
                                    onChange={onChangeHandler}
                                />

                                <input
                                    type="number"
                                    placeholder="To"
                                    name="toPrice"
                                    className={styles["price-input"]}
                                    value={inputData.toPrice}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>
                        <div className={styles["conditions-container"]}>
                            <p className={styles["condition-title"]}>
                                Condition
                            </p>
                            <div className={styles["condition-choices"]}>
                                <button
                                    type="button"
                                    className={styles["condition"]}
                                    onClick={() =>
                                        conditionHandler("new", "used")
                                    }
                                >
                                    <span className={styles["btn-content"]}>
                                        New
                                    </span>
                                    {selectedCondition.new ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            width={20}
                                            height={20}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className={styles["condition"]}
                                    onClick={() =>
                                        conditionHandler("used", "new")
                                    }
                                >
                                    <span className={styles["btn-content"]}>
                                        Used
                                    </span>
                                    {selectedCondition.used ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            width={20}
                                            height={20}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className={styles["search-title-container"]}>
                            <input
                                type="text"
                                className={styles["search-input"]}
                                name="title"
                                placeholder="Product title"
                                value={inputData.title}
                                onChange={onChangeHandler}
                            />
                            <button
                                type="submit"
                                className={styles["search-btn"]}
                            >
                                <span className={styles["search-btn-content"]}>
                                    Search
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={styles["line"]}></div>
            {!searchLoading && (
                <ProductsList title="Offers" products={data[0]} />
            )}
            {searchLoading && (
                <div className="spinner-container">
                    <SpinnerSmall height={100} width={100} />
                </div>
            )}
        </div>
    );
};
