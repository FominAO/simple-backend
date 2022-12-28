/**
 * Waits for value from DB as first arg and value from params as second
 */
export const compareRules = {
    dateFrom: (v, p) => new Date(v) >= (new Date(p)),
    dateTo: (v, p) => +new Date(v) <= (+new Date(p) + 24*60*60*1000),
    strContains: (v, p) => v.toLowerCase().includes(p.toLowerCase()),
    numberEquals: (v, p) => +v === +p,
    strEquals: (v, p) => v === p,
    boolEquals: (v, p) => v.toString() === p
}