import { paramsToFilter } from "../routes/filter-params-list.js";

export function filterByParams(array = [], params = {}) {

    return array.filter(v => compare(v, params));
}

function compare(dbObj, params) {
    let result = true;

    paramsToFilter.forEach(param => {
        const paramName = param.paramName;
        const dbName = param.dbName || paramName;

        if (params[paramName] && result) {
            result = result && param.compareRule(dbObj[dbName], params[paramName])
        }
    });

    return result;
}
