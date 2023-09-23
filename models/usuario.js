const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    usuario: {
        required: true,
        type: String
    },
    contrasenia: {
        required: true,
        type: String
    },
    nombre: {
        required: true,
        type: String
    },
    apellido: {
        required: true,
        type: String
    },
    dni: {
        required: true,
        type: Number
    },
    matricula: {
        required: false,
        type: Number
    },
    admin: {
        required: true,
        type: Boolean
    },
    email:{
        required: true,
        type: String 
    },
    editor: {
        required: true,
        type: Boolean
    },

});

dataSchema.pre('save', async function(next) { // se trabaja con function para tener scope del "this"
    if(!this.isModified('password')){
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.contrasenia, salt);
        this.contrasenia = hash
        next()
    } catch (error) {
        throw new Error('fallo el hash de pass :' + error)
    }
})

dataSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.contrasenia)
}

module.exports = mongoose.model("Usuario", dataSchema);