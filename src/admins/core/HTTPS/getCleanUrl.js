const deleteSymbol = (url, symbol) => {
    let symbolIndex = url.indexOf(symbol, 9);
    if (symbolIndex !== -1) {
        return url.substring(0, symbolIndex);
    }
    return url;
};

const getCleanUrl = () => {
    let url = window.location.href;
    if (url.indexOf('localhost:3000', 0) !== -1) return 'http://localhost:5000';
    url = deleteSymbol(url, '#');
    url = deleteSymbol(url, '/');
    return url;
};

export default getCleanUrl;