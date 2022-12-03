export function walletAddressConvertion(str) {
    if (str.length > 10) {
        return str.substr(0,5) + '...' + str.substr(str.length - 4, str.length);
    }
    return str;
}