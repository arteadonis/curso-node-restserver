const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
    });

    console.log('DB is connected');
    
  } catch (error) {
    console.log(error);
    throw new Error('Error en el momento de inicializar la base de datos');
  }
};

module.exports = { dbConnection };
