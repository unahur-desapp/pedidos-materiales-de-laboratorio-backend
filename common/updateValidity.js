const Pedido = require('../models/pedido');

const updateValidate = async () => {
    try {
        const today = new Date();
    
        // Encuentra todos los pedidos que aún están vigentes
        // const pedidos = await Pedido.find({ vigente: true });
        const pedidos = await Pedido.find();
    
        // Itera sobre cada pedido para verificar la antigüedad
        for (const pedido of pedidos) {
          const fechaUtilizacion = pedido.fecha_utilizacion;
          const diffInDays = Math.floor((today - fechaUtilizacion) / (1000 * 60 * 60 * 24));
    
          // Si la diferencia en días es mayor o igual a 10, marca el pedido como no vigente
          if (diffInDays >= 10) {
            pedido.vigente = false;
            await pedido.save(); // Guardar el pedido actualizado en la base de datos
          }
        }
        console.log('Tarea programada de actualización automática completada.');
      } catch (error) {
        console.error('Error en la tarea programada:', error);
      }
}

module.exports = updateValidate;