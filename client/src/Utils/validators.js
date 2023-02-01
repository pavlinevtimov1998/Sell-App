export const emailValidator = (data, setErrors) => {
    if (
        data.email !== "" &&
        !/[a-zA-Z0-9]{5,35}@[a-zA-Z]{2,10}\.[a-z]{1,6}/g.test(data.email)
    ) {
        setErrors((state) => ({
            ...state,
            email: { required: false, isNotValid: true },
        }));
        return false;
    } else if (
        /[a-zA-Z0-9]{5,35}@[a-zA-Z]{2,10}\.[a-z]{1,6}/g.test(data.email)
    ) {
        setErrors((state) => ({
            ...state,
            email: { required: false, isNotValid: false },
        }));
        return true;
    }
};

export const requiredValidator = (name, value, setErrors) => {
    if (value === "") {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], required: true },
        }));
        return false;
    } else {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], required: false },
        }));
        return true;
    }
};

export const lengthValidator = (neededLength, name, value, setErrors) => {
    if (value.length < neededLength && value !== "") {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], minLength: true },
        }));
        return false;
    } else {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], minLength: false },
        }));
        return true;
    }
};

export const minNumberValidator = (min, name, value, setErrors) => {
    if (+value < min && value !== "") {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], minNum: true },
        }));
        return false;
    } else {
        setErrors((state) => ({
            ...state,
            [name]: { ...state[name], minNum: false },
        }));
        return true;
    }
};

export const rePassValidator = (data, setErrors) => {
    if (data.rePassword !== data.password) {
        setErrors((state) => ({
            ...state,
            rePassword: { ...state.rePassword, isNotMatch: true },
        }));
        return false;
    } else {
        setErrors((state) => ({
            ...state,
            rePassword: { ...state.rePassword, isNotMatch: false },
        }));
        return true;
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

    if (
        !emailValidator(data, setErrors) ||
        !lengthValidator(data, setErrors) ||
        !rePassValidator(data, setErrors)
    ) {
        return false;
    }

    return true;
};
