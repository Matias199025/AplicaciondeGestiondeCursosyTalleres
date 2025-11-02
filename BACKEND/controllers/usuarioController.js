const Usuario = require('../models/Usuario');
const mongoose = require('mongoose'); // Para validar IDs

// 1. Creo un nuevo Usuario (POST /api/usuarios)
const crearUsuario = async (req, res) => {
    try {
        // Creo una nueva instancia del modelo Usuario con los datos que llegan
        const usuario = new Usuario(req.body); 
        
        // Guardo en la base de datos
        const usuarioGuardado = await usuario.save(); 
        
        res.status(201).json(await Usuario.findById(usuarioGuardado._id).select('-contraseña'));

    } catch (error) {
        console.error(error);
        // Manejo de error si el email ya existe (código 11000 de MongoDB)
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'El email ya está registrado. Debe ser único.' });
        }
        res.status(500).json({ msg: 'Error al crear el usuario. Revise los datos.' });
    }
};

// 2. Obtengo todos los Usuarios (GET /api/usuarios)
const obtenerUsuarios = async (req, res) => {
    try {
        // Busco todos los usuarios.
        const usuarios = await Usuario.find({})
            .select('-contraseña') 
            .populate('cursos_inscritos', 'nombre descripcion'); 
        
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
};

// 3. Obtengo un Usuario por ID (GET /api/usuarios/:id)
const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    //  Valido que el ID sea válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'ID de usuario no válido' });
    }

    try {
        const usuario = await Usuario.findById(id)
            .select('-contraseña')
            .populate('cursos_inscritos', 'nombre precio duracion_horas');

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el usuario' });
    }
};

// 4. Actualizo un Usuario (PUT /api/usuarios/:id)
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre_completo, email } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'ID de usuario no válido' });
    }

    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        
        // Actualizo solo los campos que interesan
        usuario.nombre_completo = nombre_completo || usuario.nombre_completo;
        usuario.email = email || usuario.email;

        const usuarioActualizado = await usuario.save();
        
        res.json(usuarioActualizado);

    } catch (error) {
        console.error(error);
        // Manejo de error si intentan cambiar el email a uno que ya existe
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'El nuevo email ya está en uso.' });
        }
        res.status(500).json({ msg: 'Error al actualizar el usuario' });
    }
};

// 5. Elimino un Usuario (DELETE /api/usuarios/:id)
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'ID de usuario no válido' });
    }

    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(404).json({ msg: 'Usuario no encontrado para eliminar' });
        }

        res.json({ msg: 'Usuario eliminado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el usuario' });
    }
};


module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};