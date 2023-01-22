import { useCarousel } from "../../Hooks/useCarousel";
import styles from "./Carousel.module.css";

const slides = [
    {
        img: "/The Mountain.jpg",
        alt: "asdasd",
    },
    {
        img: "/The Mountain.jpg",
        alt: "asdasd",
    },
    {
        img: "/The Mountain.jpg",
        alt: "asdasd",
    },
];

export const Carousel = () => {
    const { currentSlide, slidesRef } = useCarousel({
        slideInterval: 5000,
        slidesLength: slides.length,
    });

    return (
        <section className={styles["wraper"]}>
            <div className={styles["carousel-container"]}>
                <div
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    className={styles["slides"]}
                >
                    {slides.map((slide, index) => (
                        <img
                            ref={(el) => (slidesRef.current[index] = el)}
                            key={index}
                            src={slide.img}
                            alt={slide.alt}
                            className={`${styles["slide"]}`}
                        />
                    ))}
                </div>
                <div className={styles["carousel-dot-container"]}>
                    <span className={styles["dot"]} />
                </div>
            </div>
        </section>
    );
};
