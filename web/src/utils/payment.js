function double(num) {
    if (num <= 9) {
        return `0${num}`;
    }

    return num;
}

export function yuan(num) {
    return parseFloat(Math.floor(Math.floor(num) / 100) + '.' + double(Math.floor(num) % 100));
}
