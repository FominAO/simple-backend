import path from 'path';
import CRUDApi from '../../util/crud.helper.js';
import { MySQLTable } from '../../util/database.js';
import crudRouterSQL from './crud-router-sql.js';
import crudRouter from './crud-router.js';

const p = (name, isProd) => path.join(
  './',
  'database',
  `${name}-list${isProd ? '.prod' : ''}.json`
);

const CRUDrouter = (name, isSQL = false, isProd = false) => {
    if (isSQL && isProd) {
        console.warn('Prod supported only for json-based DB');
    }

    if (isSQL) {
        return crudRouterSQL('/' + name, new MySQLTable(name));
    }

    return crudRouter('/' + name, new CRUDApi(p(name, isProd)))
};

export default CRUDrouter;