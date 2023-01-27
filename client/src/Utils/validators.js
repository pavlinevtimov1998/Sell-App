export const emailValidator = (data, setErrors) => {
    if (
        data.email !== "" &&
        !/[a-zA-Z0-9]{5,35}@[a-zA-Z]{2,10}\.[a-z]{1,6}/g.test(data.email)
    ) {
        setErrors((state) => ({
            ...state,
            email: { required: false, isNotValid: true },
        }));
    } else if (
        /[a-zA-Z0-9]{5,35}@[a-zA-Z]{2,10}\.[a-z]{1,6}/g.test(data.email)
    ) {
        setErrors((state) => ({
            ...state,
            email: { required: false, isNotValid: false },
        }));
    }
};

export const requiredValidator = (name, value, setErrors) => {
    if (value === "") {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], required: true },
        }));
    } else {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], required: false },
        }));
    }
};

export const passwordValidator = (data, setErrors) => {
    console.log("password", data.password);
    if (data.password.length < 6 && data.password !== "") {
        console.log("asd");
        setErrors((state) => ({
            ...state,
            password: { ...state.password, minLength: true },
        }));
    }

    if (data.password.length >= 6) {
        setErrors((state) => ({
            ...state,
            password: { ...state.password, minLength: false },
        }));
    }
};

export const rePassValidator = (data, setErrors) => {
    console.log("rePass", data.rePassword, data.password);
    if (data.rePassword !== data.password) {
        console.log("asd");
        setErrors((state) => ({
            ...state,
            rePassword: { ...state.rePassword, isNotMatch: true },
        }));
    } else {
        setErrors((state) => ({
            ...state,
            rePassword: { ...state.rePassword, isNotMatch: false },
        }));
    }
};

export const canSubmit = (data, errors, setErrors) => {
    const hasEmpty = Object.values(data).find((value) => value === "");

    if (hasEmpty !== undefined) {
        Object.entries(data).forEach(([key, value]) => {
            if (value === "") {
                return setErrors((state) => ({
                    ...state,
                    [key]: { ...state[key], required: true },
                }));
            }
        });
        return false;
    }

    emailValidator(data, setErrors);
    passwordValidator(data, setErrors);
    rePassValidator(data, setErrors);

    const isInvalid = Object.values(errors).reduce(
        (a, v) => Object.assign(a, v),
        {}
    );
    console.log(Object.values(isInvalid));
    if (Object.values(isInvalid).includes(true)) {
        return false;
    }

    return true;
};
