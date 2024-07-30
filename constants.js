const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || '/api';
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/node-express';
const JWT_SECRET = process.env.JWT_SECRET || 'Pledge-Props-Humility'
const BCRYPT_SALT = process.env.BCRYPT_SALT || 10

module.exports = {
    PORT,
    BASE_URL,
    DB_URL,
    JWT_SECRET,
    BCRYPT_SALT
};
