import styles from "./Carousel.module.css";

const imgData = [
  {
    src: "/images/desktop-middle-banner-1704x740-24ff0036277417190c7425279caa0e76.jpg",
    alt: "some alt",
  },
  {
    src: "/images/nike.jpg",
    alt: "some alt",
  },
  {
    src: "/images/banner.jpg",
    alt: "some alt",
  },
  {
    src: "/images/adidas-shoes.jpg",
    alt: "some alt",
  },
  {
    src: "/images/nike-shoes.jpg",
    alt: "some alt",
  },
];

export const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className={`carousel slide ${styles["container"]}`}
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to={0}
          className="active"
        />
        <li data-target="#carouselExampleIndicators" data-slide-to={1} />
        <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        <li data-target="#carouselExampleIndicators" data-slide-to={3} />
        <li data-target="#carouselExampleIndicators" data-slide-to={4} />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className={`d-block w-100`}
            src={imgData[0].src}
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={imgData[1].src}
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={imgData[2].src}
            alt="Third slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={imgData[3].src}
            alt="Third slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={imgData[4].src}
            alt="Third slide"
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};
