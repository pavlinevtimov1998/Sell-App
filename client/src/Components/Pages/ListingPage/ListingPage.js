import { useContext, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { ErrorContext } from "../../../Contexts/ErrorContext";
import { useFetch } from "../../../Hooks/useFetch";
import { useResize } from "../../../Hooks/useResize";

import { getAllCategories } from "../../../Services/categoriesService";
import { getProducts } from "../../../Services/productsService";
import { ListingSearch } from "../../components/ListingSearch/ListingSearch";

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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const { state: isSmaller } = useResize(1040);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const { setMessage } = useContext(ErrorContext);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.title = "Listing Page";
    }, [searchLoading]);

    useEffect(() => {
        if (data) {
            const category = data[1].find((c) => {
                if (searchParams.get("category")) {
                    return c.title
                        .toLocaleLowerCase()
                        .startsWith(
                            searchParams.get("category")?.toLocaleLowerCase()
                        );
                }

                return undefined;
            });

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

    const toggleFilter = () => setIsFilterVisible((state) => !state);

    const getSearchedProducts = (paramsObj) => {
        setSearchParams(paramsObj);

        if (isSmaller) {
            toggleFilter();
        }

        setSearchLoading(true);
        getProducts("?" + createSearchParams(paramsObj).toString())
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
            <div
                className={`${styles["form-container"]} ${
                    styles[isFilterVisible ? "show" : "hide"]
                }`}
            >
                <ListingSearch
                    categories={data[1]}
                    chooseCategoryHandler={chooseCategoryHandler}
                    clearCategoryHandler={clearCategoryHandler}
                    selectedCategory={selectedCategory}
                    getSearchedProducts={getSearchedProducts}
                />
                {isSmaller && (
                    <>
                        {isFilterVisible && (
                            <div
                                className={styles["outside-click"]}
                                onClick={toggleFilter}
                            />
                        )}
                        <button
                            onClick={toggleFilter}
                            className={`${styles["filter-btn"]} ${
                                isFilterVisible && styles["visible-btn"]
                            }`}
                            type="button"
                        >
                            {isFilterVisible ? (
                                <svg
                                    width={20}
                                    height={20}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 512"
                                >
                                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                                </svg>
                            ) : (
                                <svg
                                    width={20}
                                    height={20}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 512"
                                >
                                    <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            )}
                        </button>
                    </>
                )}
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
