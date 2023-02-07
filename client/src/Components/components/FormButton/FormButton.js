import styles from "./FormButton.module.css";

export const FormButton = ({ content, children, className, type }) => {
    return (
        <button className={className} type={type || "submit"}>
            <span className={styles["btn-content"]}>{content}</span>
            {children}
        </button>
    );
};
