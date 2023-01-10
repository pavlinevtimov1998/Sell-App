import { Carousel } from "../../Carousel/Carousel";
import { Categories } from "./Categories/Categories";
import { ProductsSlider } from "./ProductsSlider/ProductsSlider";
import { Subscribe } from "../../Subscribe/Subscribe";

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
