import fs from 'fs'

export const getFromFile = (path, callback) => {
    fs.readFile(path, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
      });
}

/** yyyy-mm-ddThh:mm[:ss[.fff]]Z */
export const formatDate = (date) => {
    const d = new Date(+new Date(date).setMinutes(new Date(date).getTimezoneOffset()));
    
    return `${d.getFullYear()}-${twoDigs(d.getMonth() + 1)}-${twoDigs(d.getDate())}T${twoDigs(d.getHours())}:${twoDigs(d.getMinutes())}:${twoDigs(d.getSeconds())}Z`
}

export const getShortDate = (d) => {
    return `${d.getFullYear()}-${twoDigs(d.getMonth() + 1)}-${twoDigs(d.getDate())}`
}

const twoDigs = (n) => meaninglessSigns(2, n);
const meaninglessSigns = (k, number) => {
    const signsMissing = k - String(number).length;
     return '0'.repeat(signsMissing >= 0 ? signsMissing : 0) + String(number)
}
