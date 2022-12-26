import fs from 'fs';
import { getFromFile } from './utils.js';

class CRUDApi {
    path = '';

    constructor(path) {
        this.path = path;
    }

    getAll(callback) {
        fs.readFile(this.path, (err, fileContent) => {
            if (err) {
              callback({error: 'Cannot read DB. '+err, response: []});
            } else {
              callback({response: JSON.parse(fileContent)});
            }
        });
    }

    getById(id, callback) {
        fs.readFile(this.path, (err, fileContent) => {
            if (err) {
              callback({error: 'Cannot read DB. '+err, response: {}});
            } else {
                const allEntities = JSON.parse(fileContent);
                const targetEntity = allEntities.find(t => t.id == id);

                if (!targetEntity) {
                    callback({error: `Cannot find with id ${id}`})
                } else {
                    callback({response: targetEntity});
                }
            }
          });
    }

    updateById(id, data, callback) {
        if (!this.validateUpdateData(data)) {
            callback({error: `Not valid data`})
            return;
        }

        fs.readFile(this.path, (err, fileContent) => {
            if (err) {
                callback({error: 'Cannot read DB. '+err, response: {}});
            } else {
                const allEntities = JSON.parse(fileContent);
                const targetEntity = allEntities.find(t => t.id == id);

                if (!targetEntity) {
                    callback({error: `Cannot find with id ${id}`});
                } else {
                    
                    this.updateDataInEntity(data, targetEntity);

                    fs.writeFile(this.path, JSON.stringify(allEntities), err => console.log(err));
                    
                    callback(targetEntity);
                }

              
            }
          });
    }

    updateDataInEntity(data, entity) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                entity[key] = data[key];
            }
        }
        return entity;
    }

    deleteById(id, callback) {
        fs.readFile(this.path, (err, fileContent) => {
            if (err) {
              callback({error: 'Cannot read DB. '+err, response: {}});
            } else {
                const allEntities = JSON.parse(fileContent);
                const targetEntity = allEntities.find(t => t.id == id);
                const filteredEntities = allEntities.filter(t => t.id != id);

                if (!targetEntity) {
                    callback({error: `Cannot delete with id ${id}`})
                } else {
                    fs.writeFile(this.path, JSON.stringify(filteredEntities), err => console.log(err));
                    
                    callback({response: targetEntity});
                }
            }
        });
    }

    create(data, callback) {
        if (!this.validateCreateData(data)) {
            callback({error: `Not valid data`});
        }

        const newEntity = this.createEntityFromData(data);

        getFromFile(this.path, entities => {
            entities.push(newEntity);
            fs.writeFile(this.path, JSON.stringify(entities), err => console.log(err))
            
        });
        
        return callback(newEntity);
    }

    createEntityFromData(data) {
        const id = +new Date();
        return {...data, id};
    }

    validateUpdateData(data) {
        return !!data;
    }

    validateCreateData(data) {
        return !!data;
    }
}

export default CRUDApi