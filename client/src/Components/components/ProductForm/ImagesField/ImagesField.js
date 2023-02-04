import { useContext } from "react";
import { FormContext } from "../../../../Contexts/FormContext";

import styles from "./ImagesField.module.css";

export const ImagesField = ({ error }) => {
    const { addImages, imagesHandler, imagesInputRef } =
        useContext(FormContext);

    return (
        <div className={styles["images-field"]}>
            <h4 className={styles["form-field-title"]}>Photos</h4>
            <div className={styles["photos-container"]}>
                <div className={styles["image-input-field"]}>
                    <input
                        className={styles["img-input"]}
                        type="file"
                        accept="image/png, image/jpeg"
                        multiple
                        name="images"
                        ref={imagesInputRef}
                        onChange={imagesHandler}
                    />
                    <button
                        type="button"
                        className={styles["img-btn"]}
                        onClick={addImages}
                    >
                        <span className={styles["img-btn-content"]}>
                            Click here to add one or more photos ...
                        </span>
                    </button>
                </div>
                {error && <p className="error">Images are required!</p>}
            </div>
        </div>
    );
};
