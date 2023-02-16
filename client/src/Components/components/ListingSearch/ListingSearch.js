import { useContext, useState } from "react";

import { ErrorContext } from "../../../Contexts/ErrorContext";
import { CategorySelectBtn } from "../ProductForm/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";

import styles from "./ListingSearch.module.css";

export const ListingSearch = ({
    categories,
    chooseCategoryHandler,
    clearCategoryHandler,
    selectedCategory,
    getSearchedProducts,
}) => {
    const [inputData, setInputData] = useState({
        title: "",
        fromPrice: "",
        toPrice: "",
    });
    const [selectedCondition, setSelectedCondition] = useState({
        new: false,
        used: false,
    });

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

        const paramsObj = {
            category:
                selectedCategory?.category?.title?.toLocaleLowerCase() || "",
            subcategory: selectedCategory?.subcategory?.toLocaleLowerCase(),
            ...inputData,
            condition:
                Object.keys(selectedCondition).find(
                    (k) => selectedCondition[k] === true
                ) || "",
        };

        getSearchedProducts(paramsObj);
    };
    return (
        <form onSubmit={searchHandler} className={styles["filter-form"]}>
            <h1 className={styles["title"]}>Filters</h1>
            <div className={styles["filters"]}>
                <div className={styles["categories"]}>
                    <p className={styles["category-title"]}>Category</p>
                    <CategorySelectBtn
                        background="#fff"
                        categories={categories}
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
                    <p className={styles["condition-title"]}>Condition</p>
                    <div className={styles["condition-choices"]}>
                        <button
                            type="button"
                            className={styles["condition"]}
                            onClick={() => conditionHandler("new", "used")}
                        >
                            <span className={styles["btn-content"]}>New</span>
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
                            onClick={() => conditionHandler("used", "new")}
                        >
                            <span className={styles["btn-content"]}>Used</span>
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
                    <button type="submit" className={styles["search-btn"]}>
                        <span className={styles["search-btn-content"]}>
                            Search
                        </span>
                    </button>
                </div>
            </div>
        </form>
    );
};
