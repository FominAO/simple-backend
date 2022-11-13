export function filterByParams(array = [], params = {}) {
    const filterRule = (v) =>
        (params.createdBy ? v.createdBy === +params.createdBy : true) &&
        (params.from ? (new Date(v.createdAt) >= (new Date(params.from))) : true) &&
        (params.to ? (+new Date(v.createdAt) <= (+new Date(params.to) + 24*60*60*1000)) : true) &&
        (params.currency ? v.currency === +params.currency : true) &&
        (params.type ? v.type === params.type : true) &&
        (params.name ? (v.name.toLowerCase().contains(params.name)) : true) &&
        (params.isVisible ? (params.isVisible === 'true' ? v.isVisible : !v.isVisible) : true)

    return array.filter(filterRule);
}
