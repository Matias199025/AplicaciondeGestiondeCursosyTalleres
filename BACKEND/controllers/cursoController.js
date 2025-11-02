const Curso = require('../models/Curso');
const Usuario = require('../models/Usuario'); 
const mongoose = require('mongoose');

// para crear un curso
const crearCurso = async (req, res) => {
    try {
        const curso = new Curso(req.body);
        const cursoGuardado = await curso.save();
        const cursoConProfesor = await cursoGuardado.populate('profesor', 'nombre apellido'); 
        res.json(cursoConProfesor);
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ msg: 'Ya existe un curso con ese nombre.' });
        }
        res.status(400).json({ msg: 'Error al crear el curso', error: error.message });
    }
};

// Ruta Especial 1: Búsqueda Avanzada de Cursos (Filtrado y Ordenamiento)
const obtenerCursos = async (req, res) => {
    try {
        const { tags, precio_max, ordenar_por } = req.query;
        let filtro = {};
        let orden = {};

        // 1. Filtrado
        if (tags) {
            // Busco cursos que tengan AL MENOS uno de los tags especificados 
            const arrayTags = tags.split(',').map(tag => tag.trim());
            filtro.tags = { $in: arrayTags };
        }

        if (precio_max) {
            // Busco cursos cuyo precio sea menor o igual al precio_max
            filtro.precio = { $lte: Number(precio_max) };
        }

        // 2. Lógica de Ordenamiento
        if (ordenar_por) {
            switch (ordenar_por) {
                case 'precio_asc':
                    orden.precio = 1; 
                    break;
                case 'precio_desc':
                    orden.precio = -1; 
                    break;
                case 'duracion_desc':
                    orden.duracion_horas = -1;
                    break;
                default:
                    orden.createdAt = -1; 
            }
        } else {
            orden.createdAt = -1;
        }

        const cursos = await Curso.find(filtro)
            .populate('profesor', 'nombre apellido')
            .sort(orden);

        res.json(cursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los cursos' });
    }
};

//  para obtener un curso por su ID
const obtenerCursoPorId = async (req, res) => {
    const { id } = req.params;

    // Validación del ID 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'ID de curso no válido' });
    }

    try {
        const curso = await Curso.findById(id).populate('profesor', 'nombre apellido biografia');

        if (!curso) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el curso' });
    }
};

// Ruta Especial 2: Inscripción a un Curso
const inscribirUsuarioACurso = async (req, res) => {
    const { id } = req.params; // ID del curso
    const { usuarioId } = req.body; // ID del usuario que se inscribe

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(usuarioId)) {
        return res.status(400).json({ msg: 'ID de curso o usuario no válido' });
    }

    try {
        const curso = await Curso.findById(id);
        const usuario = await Usuario.findById(usuarioId);

        if (!curso) {
            return res.status(404).json({ msg: 'Curso no encontrado' });
        }

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado. Inicie sesión.' });
        }

        // 1. Validación de Cupo
        if (curso.cupo_disponible <= 0) {
            return res.status(400).json({ msg: 'Cupo completo. No hay plazas disponibles.' });
        }

        // 2. Validación: Ya está inscrito
        const yaInscrito = usuario.cursos_inscritos.some(
            (cursoId) => cursoId.toString() === id.toString()
        );
        if (yaInscrito) {
            return res.status(400).json({ msg: 'Ya estás inscrito en este curso.' });
        }

        // 3. Inscripción Exitosa: Decrementar cupo y actualizar usuario
        curso.cupo_disponible -= 1; // Decremento el cupo
        usuario.cursos_inscritos.push(id); // Agrego el curso al usuario

        // Guardo ambos cambios a la vez
        await Promise.all([curso.save(), usuario.save()]);

        res.json({ msg: '¡Inscripción exitosa!', cursoNombre: curso.nombre });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en la inscripción', error: error.message });
    }
};

//  funciones para actualizarCurso y eliminarCurso, siguiendo el patrón
const actualizarCurso = async (req, res) => {
    res.status(501).json({ msg: 'Función de actualización aún no implementada' });
};

const eliminarCurso = async (req, res) => {
    res.status(501).json({ msg: 'Función de eliminación aún no implementada' });
};


module.exports = {
    crearCurso,
    obtenerCursos,
    obtenerCursoPorId,
    actualizarCurso,
    eliminarCurso,
    inscribirUsuarioACurso,
};