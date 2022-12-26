import express from 'express';
import CRUDrouter from './utils/crud-full-api.js';
import healthRouter from './utils/health-router.js';

const staticRouters = [healthRouter];
const customRouters = [];
const routes = [
    {
        name: 'users',
        isSQL: false
    },
    {
        name: 'examples',
        isSQL: false
    }
];
const router = express.Router();


const generatedRouters = (isProd = false) => {
    const routers = [];
    routes.forEach(({name, isSQL = false}) => {
        routers.push(CRUDrouter(name, isSQL, isProd));
    });
    return [...staticRouters, ...customRouters, ...routers]
}

export default generatedRouters;

