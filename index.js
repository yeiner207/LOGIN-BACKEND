console.log("Mi primera app en express.js");
require('dotenv').config();
const express = require('express');
const { corsMiddleware } = require('./shared/cors');
const test = require('./config/database');
const { testConnection } = require('./config/database');
const { syncModels } = require('./shared/utils');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(corsMiddleware);


//Inicializar base de datos



const initializeDataBase = async() => {
    await testConnection()
    await syncModels();
    
}

initializeDataBase();


app.get('/',(req, res) => {
    console.log(`Sistema de login funcionando correctamente en el puerto ${PORT}`);
    res.json({
        message: '!Hola Express funcionando con MySQL',
        timestamp: new Date().toISOString(),
        status: 'Success'
    });
});


//login
app.use('/api/v1', require('./routes/auth'));

//Inicializar servidorr

const startServer = async () => {
    try{
        app.listen(PORT, () =>{
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();
