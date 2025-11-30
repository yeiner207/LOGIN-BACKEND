const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,   // dirección del servidor
        port: process.env.DB_PORT,   // número de puerto correcto
        dialect: 'mysql',
        logging: false, // cambiar a true para ver las consultas SQL
        pool: {
            max: 5,
            min: 0,
            acquire: 300000,
            idle: 10000
        }
    }
);

// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a MySQL establecida correctamente');
    } catch (error) {
        console.error('Error al conectar con MySQL:', error);
    }
};

module.exports = { sequelize, testConnection };
