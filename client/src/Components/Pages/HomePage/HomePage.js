import { useFetch } from "../../../Hooks/useFetch";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Categories } from "../../components/Categories/Categories";
import { Spinner } from "../../components/Spinner/Spinner";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import { getAllCategories } from "../../../Services/categoriesService";
import { getLastProducts } from "../../../Services/productsService";
import { useEffect, useState } from "react";
import { useResize } from "../../../Hooks/useResize";

const getData = () => Promise.all([getAllCategories(), getLastProducts()]);

export const HomePage = () => {
    const { isLoading, data } = useFetch(getData);
    const { state: isMobile } = useResize(600);

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
                    {!isMobile && <SearchBar />}
                    <Categories data={data[0]} />
                    <ProductsList products={data[1]} />
                </>
            )}
        </>
    );
};
