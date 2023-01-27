export const trim = (text, index) =>
    text.length - 3 > index ? text.substring(0, index) + "..." : text;
