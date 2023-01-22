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
        slideInterval: 3000,
        slidesLength: 2,
    });

    return (
        <section className={styles["wraper"]}>
            <div className={styles["carousel-container"]}>
                {/* <div className={styles["category-info"]}>
                    <h2>ufuyfuyfuyf</h2>
                    <p>guigiuyguyg</p>
                    <div />
                    <button>Go to mmhbvmhbvjhv</button>
                </div> */}
                <div
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    // className={`${styles["img-container"]} ${styles["category-active"]}`}
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
