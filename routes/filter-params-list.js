import { compareRules } from "../util/compare-rules.js";

export const paramsToFilter = [
    {
        paramName: 'createdBy',
        compareRule: compareRules.numberEquals
    },
    {
        paramName: 'from',
        dbName: 'createdAt',
        compareRule: compareRules.dateFrom
    },
    {
        paramName: 'to',
        dbName: 'createdAt',
        compareRule: compareRules.dateTo
    },
    {
        paramName: 'type',
        compareRule: compareRules.strEquals
    },
    {
        paramName: 'name',
        compareRule: compareRules.strContains
    },
    {
        paramName: 'isVisible',
        compareRule: compareRules.boolEquals
    },
];