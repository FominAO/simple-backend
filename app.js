import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import generatedRouters from './routes/routes.js';

const app = express();
const isProd = process.argv.slice(2).includes('--prod');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join('./', 'public')));

app.use(generatedRouters(isProd));

app.use((req, res) => {
    res.status(404).send({error: 'Not valid request'});
});

app.listen(3001);
