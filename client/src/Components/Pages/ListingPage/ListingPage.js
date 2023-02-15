import {
    createSearchParams,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { useFetch } from "../../../Hooks/useFetch";
import { getAllCategories } from "../../../Services/categoriesService";
import { getProducts } from "../../../Services/productsService";
import { CategorySelectBtn } from "../../components/ProductForm/CategoriesFormModal/CategorySelectBtn/CategorySelectBtn";
import { ProductsList } from "../../components/ProductsList/ProductsList";
import { Spinner } from "../../components/Spinner/Spinner";
import styles from "./ListingPage.module.css";

const getData = (params) => () =>
    Promise.all([getProducts(params), getAllCategories()]);

export const ListingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(Object.fromEntries(searchParams));
    const query = createSearchParams(Object.fromEntries(searchParams));
    console.log(query.toString());
    const { data, isLoading, setIsLoading } = useFetch(
        getData("?" + query.toString()),
        [query.toString()]
    );
    console.log(data);

    const searchHandler = (e) => {
        e.preventDefault();
    };

    const selectedCategory = () => {
        const category = data[1].find((c) =>
            c.title
                .toLocaleLowerCase()
                .startsWith(searchParams.get("category")?.toLocaleLowerCase())
        );

        if (!category) {
            return false;
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

        return {
            category: {
                title: category.title,
                image: category.image,
            },
            subcategory: subcategoryTitle?.title,
        };
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
                                selectedCategory={selectedCategory()}
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
                                />

                                <input
                                    type="number"
                                    placeholder="To"
                                    name="toPrice"
                                    className={styles["price-input"]}
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
                                >
                                    <span className={styles["btn-content"]}>
                                        New
                                    </span>
                                    <svg
                                        width={20}
                                        height={20}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                                    </svg>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg> */}
                                </button>
                                <button
                                    type="button"
                                    className={styles["condition"]}
                                >
                                    <span className={styles["btn-content"]}>
                                        Used
                                    </span>

                                    <svg
                                        width={20}
                                        height={20}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
                                    </svg>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/></svg> */}
                                </button>
                            </div>
                        </div>
                        <div className={styles["search-title-container"]}>
                            <input
                                type="text"
                                className={styles["search-input"]}
                                name="title"
                                placeholder="Product title"
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
            <ProductsList products={data[0]} />
        </div>
    );
};
