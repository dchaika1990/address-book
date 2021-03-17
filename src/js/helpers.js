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

export function rewriteArray(arr, newBook, index) {
    const before = arr.slice(0, index);
    const after = arr.slice(+index + 1);
    // console.log([...before, newBook, ...after])
    return [...before, newBook, ...after];
}