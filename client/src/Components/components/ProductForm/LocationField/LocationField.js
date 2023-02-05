import { useEffect, useState } from "react";

import styles from "./LocationField.module.css";

import { getTowns } from "../../../../Services/productsService";

export const LocationField = ({
    value,
    inputError,
    onChangeHandler,
    requiredValidator,
    error,
}) => {
    const [towns, setTowns] = useState([]);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        let timeout;

        if (value.length > 0) {
            if (!selected) {
                timeout = setTimeout(() => {
                    getTowns(value || "").then((res) => setTowns(res));
                }, 1000);
            }
        } else {
            setTowns([]);
            setSelected(false);
        }

        return () => {
            clearInterval(timeout);
        };
    }, [value, selected]);

    return (
        <div className={styles["location-field"]}>
            <h4 className={styles["form-field-title"]}>Location</h4>
            <div className={styles["input-container"]}>
                <input
                    className={`${styles["location-input"]} ${inputError(
                        "location"
                    )}`}
                    type="text"
                    name="location"
                    placeholder="Town"
                    id="location"
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={(e) => requiredValidator()}
                />
                {towns.length > 0 && (
                    <div
                        style={{ overflow: towns.length > 6 && "scroll" }}
                        className={styles["towns-container"]}
                    >
                        <ul className={styles["towns-list"]}>
                            {towns.map((t) => (
                                <li
                                    onClick={() => {
                                        onChangeHandler.call(null, {
                                            target: {
                                                name: "location",
                                                value: t.city,
                                            },
                                        });
                                        setTowns([]);
                                        setSelected(true);
                                    }}
                                    className={styles["town"]}
                                    key={t._id}
                                >
                                    {t.city}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {error && <p className="error">Location is required!</p>}
        </div>
    );
};
