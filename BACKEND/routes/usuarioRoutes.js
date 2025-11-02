const express = require('express');
const router = express.Router();

// Importo las funciones de lógica del controlador
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarioController');

// Rutas para /api/usuarios
// La ruta principal, sirve para crear un nuevo usuario (POST) y obtener todos (GET)
router.route('/')
    .post(crearUsuario)
    .get(obtenerUsuarios);

router.route('/:id')
    .get(obtenerUsuarioPorId)
    .put(actualizarUsuario)
    .delete(eliminarUsuario);

module.exports = router;