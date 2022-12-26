import express from 'express';
import { filterByParams } from '../../util/filter-by-params.js';

function crudRouter(root, DB) {
    const router = express.Router();

    router.get(root + '/', (req, res, next) => {
        DB.getAll(e => {
            e.response = (filterByParams(e.response, req.query));
            res.send(e)
        })
    });

    router.post(root + '/create', (req, res, next) => {
        DB.create(req.body, e => res.send(e));
    });

    router.get(root + '/:id', (req, res) => {
        const id = req.params.id;
        
        DB.getById(id, e => {
            res.send(e)
        })
    });

    router.post(root + '/:id', (req, res) => {
        const id = req.params.id;

        DB.updateById(id, req.body, e => res.send(e));
    });

    router.delete(root + '/:id', (req, res) => {
        const id = req.params.id;

        DB.deleteById(id, e => res.send(e));
    });

    return router;
}

export default crudRouter;