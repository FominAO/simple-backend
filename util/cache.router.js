import express from 'express';

export function cache(router) {
    const cacheRouter = express.Router();
    
    const cache = {};
    app.use(router.get('/health', (req, res) => {
        res.send('health 2 ' + healthChecked);
      }));
    cacheRouter.get('/health', (req, res, next) => {
        if (cache[req.url]) {
            res.send(req.url);
        } else {
            next();
        }
    })

    cacheRouter.use(router);


    return cacheRouter;
}

class CachedRouter {
    
    constructor() {

    }
}