const express = require('express');
const router = express.Router();

// Importo el controlador
const {
    crearCurso,
    obtenerCursos, // Incluye la búsqueda avanzada (Ruta especial 1)
    obtenerCursoPorId,
    actualizarCurso,
    eliminarCurso,
    inscribirUsuarioACurso, // Ruta especial 2
} = require('../controllers/cursoController');

// Rutas base CRUD para Cursos
router.route('/')
    .post(crearCurso)
    .get(obtenerCursos); // Ruta especial 1: Búsqueda avanzada

router.route('/:id')
    .get(obtenerCursoPorId)
    .put(actualizarCurso)
    .delete(eliminarCurso);

// Ruta especial 2: Inscripción a un Curso
router.post('/:id/inscribirse', inscribirUsuarioACurso);

module.exports = router;