const express = require('express');
const cors = require('cors');

const  {dbConnection} = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.paths = {
            vuelos: '/api/vuelos',
            aerolineas: '/api/aerolineas',
            aeropuertos: '/api/aeropuertos',
            usuarios: '/api/usuarios',
        }

        // Conectar DB
        this.conectarDB();

        // Middlewares

        this.middlewares();

        //Rutas de la app

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        //Ruta vuelos
        this.app.use( this.paths.vuelos, require('../routes/vuelos') );
        //Ruta aerolineas
        this.app.use( this.paths.aerolineas, require('../routes/aerolineas') );
        //Ruta aeropuertos
        this.app.use( this.paths.aeropuertos, require('../routes/aeropuertos') );
        //Ruta usuarios
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('listening on port '+this.port);
        });
    }

}

module.exports = Server;