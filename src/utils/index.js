export const fetcher = (url) => fetch(url).then(rep => rep.json())

export const asArray = (value) => [value]