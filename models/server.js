const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { userRoutes } = require('../routes/user.routes');
const { transferRoutes } = require('../routes/transfer.routes');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    //Path Routes
    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    // DATABASE
    this.database();

    //MIDDLEWARES
    this.middlewares();

    //RUTAS
    this.routes();
  }

  //CREAMOS LOS MIDDLEWARES
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  //TRAEMOS LAS RUTAS
  routes() {
    this.app.use(this.paths.users, userRoutes);
    this.app.use(this.paths.transfers, transferRoutes);
  }

  //   VERIFICAMOS SI LA DATABASE ESTA VINCULADA
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  // Escuchar el port
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Por', this.port);
    });
  }
}
module.exports = Server;
