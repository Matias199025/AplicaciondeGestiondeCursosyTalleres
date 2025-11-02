const express = require('express');
const router = express.Router();

// Importo el controlador con las funciones de lógica
const {
    crearProfesor,
    obtenerProfesores,
    obtenerReporteProfesores, //  endpoint especial
} = require('../controllers/profesorController');

// Rutas base CRUD para Profesores
router.post('/', crearProfesor);
router.get('/', obtenerProfesores);

// Ruta especial 3: Reporte de Profesores (usa Aggregation Pipeline)
router.get('/reportes', obtenerReporteProfesores);

module.exports = router;