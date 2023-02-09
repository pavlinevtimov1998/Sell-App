import { useFetch } from "../../../Hooks/useFetch";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Categories } from "../../components/Categories/Categories";
import { Spinner } from "../../components/Spinner/Spinner";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import { getAllCategories } from "../../../Services/categoriesService";
import { getLastProducts } from "../../../Services/productsService";
import { useEffect, useState } from "react";

const getData = () => Promise.all([getAllCategories(), getLastProducts()]);

export const HomePage = () => {
    const { isLoading, data } = useFetch(getData);
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(
        window.innerWidth > 600
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.title = "Welcome Page";
    }, []);

    useEffect(() => {
        const resizeHandler = (e) => {
            if (e.target.innerWidth > 600) {
                setIsSearchBarVisible(true);
            } else {
                setIsSearchBarVisible(false);
            }
        };

        window.addEventListener("resize", resizeHandler);

        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {isSearchBarVisible && <SearchBar />}
                    <Categories data={data[0]} />
                    <ProductsList products={data[1]} />
                </>
            )}
        </>
    );
};
