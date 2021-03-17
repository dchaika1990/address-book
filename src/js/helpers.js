export function checkAttribute(elem, attribute) {
    return elem.hasAttribute(attribute);
}

export function sortCol(arr, key, flag) {
    arr.sort((a, b) => {
        if (flag) {
            return (a[key] > b[key]) ? 1 : -1;
        }
        return (a[key] > b[key]) ? -1 : 1;
    })
}