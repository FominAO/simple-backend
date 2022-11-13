import express from 'express';
import backupRouter from './utils/backup-router.js';
import CRUDrouter from './utils/crud-full-api.js';
import healthRouter from './utils/health-router.js';

const staticRouters = [backupRouter, healthRouter];
const routes = [
    {
        name: 'users',
        isSQL: false
    },
    {
        name: 'examples',
        isSQL: false
    },
];
const router = express.Router();


const generatedRouters = (isProd = false) => {
    const routers = [];
    routes.forEach(({name, isSQL = false}) => {
        routers.push(CRUDrouter(name, isSQL, isProd));
    });
    return [...staticRouters, ...routers]
}

export default generatedRouters;

