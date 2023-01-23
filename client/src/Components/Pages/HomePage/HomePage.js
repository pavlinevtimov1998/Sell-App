import { useFetch } from "../../../Hooks/useFetch";

import { SearchBar } from "../../SearchBar/SearchBar";
import { Categories } from "../../Categories/Categories";
import { MainLayout } from "../../Core/MainLayout/MainLayout";
import { Spinner } from "../../Spinner/Spinner";

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
