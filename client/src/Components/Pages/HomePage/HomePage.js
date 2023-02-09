import { useFetch } from "../../../Hooks/useFetch";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Categories } from "../../components/Categories/Categories";
import { Spinner } from "../../components/Spinner/Spinner";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import { getAllCategories } from "../../../Services/categoriesService";
import { getLastProducts } from "../../../Services/productsService";
import { useEffect } from "react";

const getData = () => Promise.all([getAllCategories(), getLastProducts()]);

export const HomePage = () => {
    const { isLoading, data } = useFetch(getData);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.title = "Welcome Page";
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <SearchBar />
                    <Categories data={data[0]} />
                    <ProductsList products={data[1]} />
                </>
            )}
        </>
    );
};
