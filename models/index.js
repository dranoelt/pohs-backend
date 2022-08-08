import {Sequelize, DataTypes} from 'sequelize';
import {HOST, USER, PASSWORD, DB, dialect, pool} from '../config/db.js';
import * as dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.INSTANCE_HOST,
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