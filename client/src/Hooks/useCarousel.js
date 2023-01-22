import { useState, useEffect, useRef } from "react";

export function useCarousel({ slideInterval = 3000, slidesLength = 1 }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesRef = useRef([]);

    useEffect(() => {
        slidesRef.current.forEach((slide, index) => {
            slide.dataset.index = index;
        });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesLength);
        }, slideInterval);

        return () => clearInterval(intervalId);
    }, [slideInterval, slidesLength]);

    return { currentSlide, slidesRef };
}
