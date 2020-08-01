export function getDateString(str) {
    const date = new Date(str.substring(0, 10));
    const month = date.toLocaleString('default', { month: 'long' });
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
}

export function getDateStringBrief(str) {
    const date = new Date(str.substring(0, 10));
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}