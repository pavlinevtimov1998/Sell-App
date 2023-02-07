import { useState } from "react";

import styles from "./ProductTypeOptions.module.css";

export const ProductTypeOptions = ({ selectTypeAndCondition, error }) => {
    const [type, setType] = useState({ selected: "" });
    const [condition, setCondition] = useState({ selected: "" });

    const changeType = (e) => {
        setType((state) => ({
            selected: e.target.name === state.selected ? "" : e.target.name,
        }));

        selectTypeAndCondition("type", e.target.name);
    };

    const changeCondition = (e) => {
        setCondition((state) => ({
            selected: e.target.name === state.selected ? "" : e.target.name,
        }));

        selectTypeAndCondition("condition", e.target.name);
    };

    return (
        <div className={styles["more-info-field"]}>
            <h4>More info</h4>
            <div className={styles["post-type"]}>
                <p className={styles["post-type-label"]}>Type</p>
                <div className={styles["post-type-options"]}>
                    <button
                        type="button"
                        className={`${styles["type-option"]} ${
                            styles[
                                type.selected === "Business" ? "selected" : ""
                            ]
                        }`}
                        title="Business"
                        name="Business"
                        onClick={changeType}
                    >
                        Business
                    </button>
                    <button
                        type="button"
                        className={`${styles["type-option"]} ${
                            styles[
                                type.selected === "Non-business"
                                    ? "selected"
                                    : ""
                            ]
                        }`}
                        title="Non-business"
                        name="Non-business"
                        onClick={changeType}
                    >
                        Non-business
                    </button>
                </div>
                {error.type && <p className="error">Type is requried!</p>}
            </div>
            <div className={styles["condition-type"]}>
                <p className={styles["condition-label"]}>Condition</p>
                <div className={styles["condition-options"]}>
                    <button
                        className={`${styles["condition-option"]} ${
                            styles[
                                condition.selected === "New" ? "selected" : ""
                            ]
                        }`}
                        title="New"
                        type="button"
                        name="New"
                        onClick={changeCondition}
                    >
                        New
                    </button>
                    <button
                        className={`${styles["condition-option"]} ${
                            styles[
                                condition.selected === "Nsed" ? "selected" : ""
                            ]
                        }`}
                        title="Used"
                        type="button"
                        name="Nsed"
                        onClick={changeCondition}
                    >
                        Used
                    </button>
                </div>
                {error.condition && (
                    <p className="error">Condition is requried!</p>
                )}
            </div>
        </div>
    );
};
