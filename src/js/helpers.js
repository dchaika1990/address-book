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
    return [...before, newBook, ...after];
}

export function displayRows (input, rows) {
    let searchValue = input.value.toLowerCase().trimLeft();
    rows.forEach( row => {
        [...row.querySelectorAll('[data-edit]')].some( value => value.textContent.toLowerCase().trimLeft().indexOf(searchValue) > -1 )
            ? row.style.display = 'table-row'
            : row.style.display = 'none'
    } )
}