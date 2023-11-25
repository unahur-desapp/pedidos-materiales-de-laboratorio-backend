const Mail = require("../models/mail.js");

//Verbos para materiales
//Post de un material
module.exports.getMails = async (req, res) => {
    try {
        const data = await Mail.findById(req.params.id_pedido)
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.sendMail = async (req, res) => {
    console.log(req.body) 
    try {
        const id = req.body.id_pedido;
        const mail = req.body.mail;
        const data = await Mail.findById(id)
        data.list_mensajes.push(mail)
        const dataToSave = await data.save();
        return res.status(200).json(dataToSave);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  };

  module.exports.deleteMail = async (req, res) => {
    const id = req.params.id;
    await Mail.findByIdAndDelete(id);
    try {
        return res.send(
            `Mensaje con id: ${id} fue eliminado correctamente`
          );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };