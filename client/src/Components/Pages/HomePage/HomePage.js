import { useFetch } from "../../../Hooks/useFetch";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Categories } from "../../components/Categories/Categories";
import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";
import { ProductsList } from "../../components/ProductsList/ProductsList";

import { getAll } from "../../../Services/categoriesService";
import { getLastProducts } from "../../../Services/productsService";

const getData = () => Promise.all([getAll(), getLastProducts()]);

export const HomePage = () => {
    const { isLoading, data } = useFetch(getData);

    return (
        <>
            <MainLayout>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <SearchBar />
                        <Categories data={data[0]} />
                        <ProductsList products={data[1]} />
                    </>
                )}
            </MainLayout>
        </>
    );
};
