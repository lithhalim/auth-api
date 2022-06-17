require('dotenv').config()
const { Sequelize } = require('sequelize');

//USE TO RUN THE DATABASE ON HEROKKU TO MAKE CONFIGRATION 
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,rejectUnauthorized: false},
                native: true
            }
        } : {};


module.exports= new Sequelize(process.env.DATABASE_URL,sequelizeOptions) //'postgres://user:pass@example.com:5432/dbname' Example for postgres

