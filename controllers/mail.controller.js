const Mail = require("../models/mail.js");

//Verbos para materiales
//Post de un material
module.exports.getMails = async (req, res) => {
    try {
        const data = await Mail.findById(req.params.id)
        return res.json(data);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.sendMail = async (req, res) => {
    console.log(req.body) 
    try {
        const updatedData = req.body;   
        
        const data = new Mail(updatedData);  
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