import { Carousel } from "../../Carousel/Carousel";
import { Categories } from "./Categories";
import { ProductsSlider } from "./ProductsSlider";

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
