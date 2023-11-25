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

const cors = require('cors');
var http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors:{
    origin:whiteList,
    methods: ['GET','POST','DELETE','PATCH'],
    headers: "my-custom-header",
    credentials: true
  },
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader);
  }
});

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


const chatRooms = {};

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Manejar conexión a una sala específica basada en el ID de pedido
  socket.on('joinChat', (pedidoId) => {
    socket.join(pedidoId);
    io.to(pedidoId).emit('chatMessage', '¡Bienvenido al chat!');
  });

  // Manejar mensaje en una sala específica
  socket.on('sendMessage', (pedidoId, message) => {
    console.log(pedidoId)
    io.to(pedidoId).emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});


http.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`)
});