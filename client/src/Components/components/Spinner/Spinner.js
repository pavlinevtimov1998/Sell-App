import styles from "./Spinner.module.css";

export const Spinner = () => {
    return (
        <svg
            className={styles["spinner"]}
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
        >
            <circle
                className={styles["circle"]}
                cx="150"
                cy="150"
                r="120"
                opacity=".89"
                fill="none"
                stroke="#632b26"
                strokeWidth="12"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
            <circle
                id="arc2"
                className="circle"
                cx="150"
                cy="150"
                r="120"
                opacity=".49"
                fill="none"
                stroke="#632b26"
                strokeWidth="8"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
            <circle
                className={`${styles["circle"]} ${styles["arc3"]}`}
                cx="150"
                cy="150"
                r="100"
                opacity=".49"
                fill="none"
                stroke="#632b26"
                strokeWidth="20"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
            <circle
                className={`${styles["circle"]} ${styles["4"]}`}
                cx="150"
                cy="150"
                r="120"
                opacity=".49"
                fill="none"
                stroke="#632b26"
                strokeWidth="30"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
            <circle
                className={`${styles["circle"]} ${styles["arc5"]}`}
                cx="150"
                cy="150"
                r="100"
                opacity=".89"
                fill="none"
                stroke="#632b26"
                strokeWidth="8"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
            <circle
                className={`${styles["circle"]} ${styles["arc6"]}`}
                cx="150"
                cy="150"
                r="90"
                opacity=".49"
                fill="none"
                stroke="#632b26"
                strokeWidth="16"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
            <circle
                className={`${styles["circle"]} ${styles["arc7"]}`}
                cx="150"
                cy="150"
                r="90"
                opacity=".89"
                fill="none"
                stroke="#632b26"
                strokeWidth="8"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
            <circle
                className={`${styles["circle"]} ${styles["arc8"]}`}
                cx="150"
                cy="150"
                r="80"
                opacity=".79"
                fill="#4DD0E1"
                fillOpacity="0"
                stroke="#632b26"
                strokeWidth="8"
                strokeLinecap="square"
                strokeOpacity=".99213"
                paintOrder="fill markers stroke"
            />
        </svg>
    );
};
