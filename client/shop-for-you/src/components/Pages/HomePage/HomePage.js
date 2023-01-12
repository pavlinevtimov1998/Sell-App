import { Carousel } from "../../Components/Carousel/Carousel";
import { Categories } from "../../Components/Categories/Categories";
import { ProductsSlider } from "../../Components/ProductsSlider/ProductsSlider";
import { Subscribe } from "../../Components/Subscribe/Subscribe";

export const HomePage = () => {
    return (
        <>
            <Carousel />
            <ProductsSlider />
            <Categories />
            <ProductsSlider />
            <Subscribe />
        </>
    );
};
