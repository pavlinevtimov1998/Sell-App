import style from "./Subscribe.module.css";

export const Subscribe = () => {
    return (
        <section className={style["subscribe-section"]}>
            <div className={style["subscribe-container"]}>
                <h1>Be one of the first!</h1>
                <p>
                    Subscribe for exclusive discounts, news, events, and more.
                </p>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter your e-mail"
                        />
                        <button type="submit" className="btn btn-dark">
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
