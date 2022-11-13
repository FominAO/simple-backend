import mysql from 'mysql2';

export const sqlPool = mysql.createPool({
    host: '10.8.0.2',
    user: "root",
    database: 'bruh-app',
    password: '78436587'
}).promise();

export const getAll = (table) => `SELECT * FROM ${table}`;

export const getById = (table, id) => `SELECT * FROM ${table} WHERE id=${id}`;

export const getFiltered = (table, filters) => {
    let filterSQL = '';
    if (filters && Object.keys(filters).length) {
        const filtersKeys = Object.keys(filters);
        filterSQL = filtersKeys.reduce((sql, key) => {
            const and = sql.length > 6 ? ' AND' : '';
            return `${sql}${and} ${key}='${filters[key]}'`
        }, 'WHERE ')
    }

    return `SELECT * FROM ${table} ${filterSQL}`
}

export class MySQLTable {
    table = '';
    pool;
    constructor(table) {
        this.table = table;
        this.pool = sqlPool;
    }
    getAll = () => this.pool.execute(`SELECT * FROM ${this.table}`)
        .then(([rows, meta]) => ({rows, meta}))
        .catch(error => ({error}));

    getById = (id) => this.pool.execute(`SELECT * FROM ${this.table} WHERE id=${id}`)
        .then(([rows, meta]) => ({...rows[0]}))
        .catch(error => ({error}));

    getFiltered = (filters) => {
        let filterSQL = '';
        if (filters && Object.keys(filters).length) {
            const filtersKeys = Object.keys(filters);
            filterSQL = filtersKeys.reduce((sql, key) => {
                const and = sql.length > 6 ? ' AND' : '';
                if (filters[key] === '') {
                    return sql;
                }
                return `${sql}${and} ${key}='${filters[key]}'`
            }, 'WHERE ')
        }
    
        return this.pool.execute(`SELECT * FROM ${this.table} ${filterSQL}`)
            .then(([rows, meta]) => ({rows, meta}))
            .catch(error => ({error}));
    }

    createSimple = (data) => {
        return this.pool.execute(`INSERT INTO ${this.table} (${Object.keys(data).join(', ')}) VALUES ('${Object.values(data).join(`', '`)}')`)
            .then(([meta]) => (this.getById(meta.insertId)))
            .then((e) => ({...e}))
            .catch(error => {
                console.log('error: ', error)
                return ({error})
            });
    }

    updateByIdSimple = (id, data) => {
        let setSQL = '';
        if (data && Object.keys(data).length) {
            const dataKeys = Object.keys(data);
            setSQL = dataKeys.reduce((sql, key) => {
                const and = sql.length > 4 ? ', ' : '';
                return `${sql}${and} ${key}='${data[key]}'`;
            }, 'SET ')
        } else {
            return;
        }
        return this.pool.execute(`UPDATE ${this.table} ${setSQL} WHERE id=${id}`)
            .then(() => this.getById(id))
            .then(([rows, meta]) => ({...rows[0]}))
            .catch(error => ({error}));
    }

    deleteById = (id) => this.pool.execute(`DELETE FROM ${this.table} WHERE id=${id}`)
        .then(([rows, meta]) => ({rows, meta}))
        .catch(error => ({error}));
}