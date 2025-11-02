const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // Conecto usando la variable de entorno MONGO_URI
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Conectado en: ${connection.connection.host}:${connection.connection.port}`);
    } catch (error) {
        console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
        // si la conexión falla
        process.exit(1);
    }
};

module.exports = conectarDB;