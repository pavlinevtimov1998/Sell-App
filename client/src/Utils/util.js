export const trim = (text, index) =>
    text.length - 3 > index ? text.substring(0, index) + "..." : text;

export const dateParser = (date) => {
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();

    return `${day} ${monthList[month]} ${year}`;
};

const monthList = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];
