require("dotenv").config();
require('./database/connectDb'); 
const authRoute = require("./routes/auth.route");
const equipoRoute = require("./routes/equipo.route");
const materialRoute = require("./routes/material.route");
const pedidoRoute = require("./routes/pedido.route");
const reactivoRoute = require("./routes/reactivo.route");
const userRoute = require("./routes/user.route");
const mailRoute = require("./routes/mail.route");
const express = require("express");

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

var http = require('http').Server(app);
const io = require('socket.io')(http, {
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": whiteList,
      "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH",
      "Access-Control-Allow-Headers": "my-custom-header",
      "Access-Control-Allow-Credentials": true
    });
    res.end();
  },
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader);
  }
});
const cors = require('cors');
app.use(cors({
    // usando funcion de callback no pueden entrar a los controladores
    origin: function(origin, callback){
        if(!origin ||
             whiteList //MODO TESTING
             //whiteList.includes(origin) //MODO PRODUCCTION
             ){
                return callback(null, origin)
        }
        return callback('error de Cors ' + origin + " no autorizado!")
    },
    credentials:true
}))

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/equipo", equipoRoute);
app.use("/api/material", materialRoute);
app.use("/api/pedido", pedidoRoute);
app.use("/api/reactivo", reactivoRoute);
app.use("/api/usuario", userRoute);
app.use("/api/mail", mailRoute);


io.on('connection', (socket) => {
  console.log('Se ha conectado un cliente');

  socket.broadcast.emit('chat_message', {
      usuario: 'INFO',
      mensaje: 'Se ha conectado un nuevo usuario'
  });

  socket.on('chat_message', (data) => {
      io.emit('chat_message', data);
  });
});


http.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
});