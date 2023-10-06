require("dotenv").config();
require('./database/connectDb'); 
const authRoute = require("./routes/auth.route");
const equipoRoute = require("./routes/equipo.route");
const materialRoute = require("./routes/material.route");
const pedidoRoute = require("./routes/pedido.route");
const reactivoRoute = require("./routes/reactivo.route");
const userRoute = require("./routes/user.route");

const express = require("express");
const app = express();

const cors = require('cors');
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];
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

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});