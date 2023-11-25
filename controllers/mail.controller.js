const Mail = require("../models/mail.js");

//Verbos para materiales
//Post de un material
module.exports.getMails = async (req, res) => {
    try {
        const data = await Mail.findById(req.params.id)
        console.log(req)
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
        let data = await Mail.findById(id)
        if(data == null){
            data = new Mail({
                _id: id,
                list_mensajes:[]
            })  
        }
        data.list_mensajes.push(mail)
        const dataToSave = await data.save();
        console.log(dataToSave)
        return res.status(200).json(dataToSave);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
  };
  module.exports.updateMails =async (req, res) => {
    console.log(req.body) 
    try {
        const id = req.body._id;
        const listMens = {list_mensajes:req.body.list_mensajes};
        console.log(req.body)
        await Mail.findOneAndUpdate(id,listMens);
        return res.status(200).json('ok');
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