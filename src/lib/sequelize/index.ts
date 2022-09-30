import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('./../../../config/database.json')[env];
// import config from './../../../config/database.json';
let sequelize: Sequelize.Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);
}
export default sequelize;