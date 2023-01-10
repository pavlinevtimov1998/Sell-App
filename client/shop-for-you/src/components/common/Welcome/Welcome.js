import { Carousel } from "../../Carousel/Carousel";
import { Categories } from "./Categories/Categories";
import { ProductsSlider } from "./ProductsSlider/ProductsSlider";

export const Welcome = () => {
  return (
    <>
      <Carousel />
      <ProductsSlider />
      <Categories />
      <ProductsSlider />
    </>
  );
};
