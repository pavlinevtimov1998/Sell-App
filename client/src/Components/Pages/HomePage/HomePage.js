import { useFetch } from "../../../Hooks/useFetch";

import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Categories } from "../../components/Categories/Categories";
import { MainLayout } from "../../components/Core/MainLayout/MainLayout";
import { Spinner } from "../../components/Spinner/Spinner";

import { getAll } from "../../../Services/categoriesService";

export const HomePage = () => {
    const { isLoading, data } = useFetch(getAll);

    return (
        <>
            <MainLayout>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <SearchBar />
                        <Categories data={data} />
                    </>
                )}
            </MainLayout>
        </>
    );
};
