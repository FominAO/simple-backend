import fs from 'fs';
import express from 'express';
import { backup } from "../../util/backup.helper.js";
import { getShortDate } from "../../util/utils.js";

const backupRouter = express.Router();

backupRouter.get('/backup/:tableName', (req, res) => {
    const dbPath = `./database/data/${req.params.tableName}-list.json`;
    const backupPath = `./database/backup/checks-list.${getShortDate(new Date)}.html`;

    if (!fs.existsSync(dbPath)) {
        res.send('Can not find table in ' + dbPath);
    }

    backup(dbPath, backupPath, (table) => {
        res.send(table);
    })
});

export default backupRouter