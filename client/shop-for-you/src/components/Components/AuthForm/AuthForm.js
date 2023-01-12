export const AuthForm = ({ styles, type }) => {
    return (
        <div className={styles["form-container"]}>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control input-error"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                    <small className="form-text text-muted error">
                        Invalid email!
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                    />
                    <small className="form-text text-muted error">
                        Password should be at least 5 characters!
                    </small>
                </div>
                {type === "register" && (
                    <>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2">
                                Repeat Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword2"
                                placeholder="Password"
                            />
                            <small className="form-text text-muted error">
                                Password should be at least 5 characters!
                            </small>
                        </div>
                        <div className={`form-check ${styles["check"]}`}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                            />
                            <label
                                className={`form-check-label ${styles["terms"]}`}
                                htmlFor="exampleCheck1"
                            >
                                I agree with the terms and conditions.
                            </label>
                        </div>
                    </>
                )}
                <button type="submit" className="btn btn-dark">
                    {type === "register" ? "Register" : "Login"}
                </button>
            </form>
        </div>
    );
};
