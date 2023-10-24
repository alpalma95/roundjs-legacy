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

export const appendDOM = (root, innerHTML) => {
    if (Array.isArray(innerHTML)) {
      const sanitizedArray = filterEmptyStrings(innerHTML);
      sanitizedArray.forEach((el) => {
        if (Array.isArray(el)) {
          el.forEach(el => root.appendChild(el))
        } else {
          root.appendChild(el)
        }
      });
    } else {
      root.appendChild(innerHTML);
    }
}