const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conectarDB = require('./config/db');

// Importo las rutas
const cursoRoutes = require('./routes/cursoRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); 

// 1. Cargo las variables de entorno del archivo .env
dotenv.config();

// 2. Conecto la base de datos
conectarDB();

// 3. Creo la aplicación Express
const app = express();

// 4. Middlewares 
app.use(express.json()); 
app.use(cors()); 

// 5. Defino la Ruta Principal
app.get('/', (req, res) => {
    res.send('API Funcionando. Usa /api/cursos o /api/profesores');
});

// 6. Defino las Rutas de la API (Endpoints)
app.use('/api/cursos', cursoRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/usuarios', usuarioRoutes); 

// 7. Inicio el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`📡 Servidor corriendo en el puerto ${PORT}`);
});
