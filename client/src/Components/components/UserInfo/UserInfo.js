import { dateParser } from "../../../Utils/util";
import styles from "./UserInfo.module.css";

export const UserInfo = ({ user }) => {
    return (
        <div className={styles["user-info"]}>
            <div className={styles["user-photo"]}>
                <img
                    src="/user-default.png"
                    alt="userphoto"
                    className={styles["img"]}
                />
            </div>
            <div className={styles["info"]}>
                <p title={user.email} className={styles["email"]}>
                    {user.email}
                </p>
                <p className={styles["timestamp"]}>
                    <span>In Sell-App from </span>
                    <span className={styles["date"]}>
                        {dateParser(user.createdAt)}
                    </span>
                </p>
            </div>
        </div>
    );
};
