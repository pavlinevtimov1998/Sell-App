export const Categories = () => {
  return (
    <section id="men-women-categories">
      <div className="categories-container">
        <a className="women-img-container" href="/">
          <img src="/images/women-section.png" alt="" />
          <div className="categories-btn women">
            <span>Women's</span>
          </div>
        </a>
        <a className="men-img-container" href="/">
          <img src="/images/mens-section.png" alt="" />
          <div className="categories-btn men">
            <span>Men's</span>
          </div>
        </a>
      </div>
    </section>
  );
};
