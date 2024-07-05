export function isBlank(str) {
    return str === '' || str === null || str === undefined
}

export function isNotBlank(str) {
    return !isBlank(str)
}


export function isEmpty(obj) {
    return Object.values(obj).every(value =>
        value === null || value === undefined || value === ''
    );
}
