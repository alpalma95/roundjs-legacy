export const filterEmptyStrings = (arr) => {
    const sanitizedArray = arr.filter(el => {
        if (typeof el === 'string') {
            if (el.trim() !== "") return el 
        } else {
            return el
        }
    })
    return sanitizedArray;
}