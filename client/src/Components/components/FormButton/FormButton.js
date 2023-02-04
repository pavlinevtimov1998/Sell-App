import styles from "./FormButton.module.css";

export const FormButton = ({ content, children }) => {
    return (
        <button className={styles["btn"]} type="submit">
            <span className={styles["sub-btn-content"]}>{content}</span>
            {children}
        </button>
    );
};
