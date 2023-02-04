import { useContext, useState } from "react";
import { FormContext } from "../../../../Contexts/FormContext";

import styles from "./ProductTypeOptions.module.css";

export const ProductTypeOptions = () => {
    const [type, setType] = useState({ selected: "" });
    const [condition, setCondition] = useState({ selected: "" });
    const { selectTypeAndCondition } = useContext(FormContext);

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
                                type.selected === "business" ? "selected" : ""
                            ]
                        }`}
                        title="Business"
                        name="business"
                        onClick={changeType}
                    >
                        Business
                    </button>
                    <button
                        type="button"
                        className={`${styles["type-option"]} ${
                            styles[
                                type.selected === "non-business"
                                    ? "selected"
                                    : ""
                            ]
                        }`}
                        title="Non-business"
                        name="non-business"
                        onClick={changeType}
                    >
                        Non-business
                    </button>
                </div>
            </div>
            <div className={styles["condition-type"]}>
                <p className={styles["condition-label"]}>Condition</p>
                <div className={styles["condition-options"]}>
                    <button
                        className={`${styles["condition-option"]} ${
                            styles[
                                condition.selected === "new" ? "selected" : ""
                            ]
                        }`}
                        title="New"
                        type="button"
                        name="new"
                        onClick={changeCondition}
                    >
                        New
                    </button>
                    <button
                        className={`${styles["condition-option"]} ${
                            styles[
                                condition.selected === "used" ? "selected" : ""
                            ]
                        }`}
                        title="Used"
                        type="button"
                        name="used"
                        onClick={changeCondition}
                    >
                        Used
                    </button>
                </div>
            </div>
        </div>
    );
};
