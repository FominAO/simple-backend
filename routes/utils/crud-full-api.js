import path from 'path';
import CRUDApi from '../../util/crud.helper.js';
import crudRouterSQL from './crud-router-sql.js';
import crudRouter from './crud-router.js';

const p = (name, isProd) => path.join(
  './',
  'database',
  'data',
  `${name}-list${isProd ? '.prod' : ''}.json`
);

const CRUDrouter = (name, isSQL = false, isProd = false) => {
    if (isSQL && isProd) {
        console.warn('Prod supported only for json-based DB');
    }

    if (isSQL) {
        crudRouterSQL(root, new MySQLTable('checks'));
    }

    return crudRouter('/' + name, new CRUDApi(p(name, isProd)))
};

export default CRUDrouter;