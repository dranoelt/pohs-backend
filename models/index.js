import {Sequelize, DataTypes} from 'sequelize';
import {HOST, USER, PASSWORD, DB, dialect, pool} from '../config/db.js';
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    operatorsAliases: false,
    pool: {
        max: pool.max,
        min: pool.min,
        acquire: pool.acquire,
        idle: pool.idle
    },
    timezone: '+07:00'
});
export {sequelize, DataTypes};