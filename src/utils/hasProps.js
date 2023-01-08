export const hasProps = (obj) => {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) return true;
    }
    return false;
}