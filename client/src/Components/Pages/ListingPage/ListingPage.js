import { useContext, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { ErrorContext } from "../../../Contexts/ErrorContext";
import { useFetch } from "../../../Hooks/useFetch";

import { getAllCategories } from "../../../Services/categoriesService";
import { getProducts } from "../../../Services/productsService";
import { ListingSearch } from "../../components/ListingSearch/ListingSearch";

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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const { setMessage } = useContext(ErrorContext);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.title = "Listing Page";
    }, [searchLoading]);

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

    const getSearchedProducts = (paramsObj) => {
        setSearchParams(paramsObj);

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
            <div className={styles["form-container"]}>
                <ListingSearch
                    categories={data[1]}
                    chooseCategoryHandler={chooseCategoryHandler}
                    clearCategoryHandler={clearCategoryHandler}
                    selectedCategory={selectedCategory}
                    getSearchedProducts={getSearchedProducts}
                />
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
