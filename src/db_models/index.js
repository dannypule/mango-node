import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
console.log('DATABASE: ', config.db.database);
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== 'index.js' && !file.includes('js.map');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
