import styles from "./DropdownMenu.module.css";

export const DropdownMenu = ({ elRef, index, subcategories }) => {
    return (
        <div
            ref={(el) => elRef.current.push(el)}
            className={styles["dropdown"]}
        >
            <ul className={styles["list"]}>
                <h4 className={styles["title"]}>Products</h4>
                {subcategories.map((s, i) => (
                    <li key={i}>
                        <a href="/">aaaaaaaaaa</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
