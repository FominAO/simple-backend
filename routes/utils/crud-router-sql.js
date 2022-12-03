import express from 'express';
import { MySQLTable } from '../../util/database.js';

function crudRouterSQL(root, DB = new MySQLTable('')) {
    const router = express.Router();

    router.get(root + '/', (req, res, next) => {
        DB.getFiltered(req.query).then(({rows, meta}) => {
            res.send({response: rows})
        })
    });

    router.post(root + '/create', (req, res, next) => {
        DB.createSimple(req.body).then(e => res.send(e));
    });

    router.get(root + '/:id', (req, res) => {
        const id = req.params.id;
        
        DB.getById(id).then((e) => {
            res.send(e);
        });
    });

    router.post(root + '/:id', (req, res) => {
        const id = req.params.id;

        DB.updateByIdSimple(id, req.body).then(e => res.send(e));
    });

    router.delete(root + '/:id', (req, res) => {
        const id = req.params.id;

        DB.deleteById(id).then(() => res.send({}));

    });

    return router;
}

export default crudRouterSQL;