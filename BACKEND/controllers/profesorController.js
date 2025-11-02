const Profesor = require('../models/Profesor');

//  creo un profesor
const crearProfesor = async (req, res) => {
    // try-catch para manejar errores
    try {
        const profesor = new Profesor(req.body);
        const profesorGuardado = await profesor.save();
        res.json(profesorGuardado);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Error al crear el profesor', error: error.message });
    }
};

//  obtengo todos los profesores
const obtenerProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.find();
        res.json(profesores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener los profesores' });
    }
};

// Ruta Especial 3: Reporte de Profesores (Aggregation Pipeline)
const obtenerReporteProfesores = async (req, res) => {
    try {
        const reporte = await Profesor.aggregate([
            // 1. Uno Profesores con Cursos
            {
                $lookup: {
                    from: 'cursos', 
                    localField: '_id', 
                    foreignField: 'profesor', 
                    as: 'cursos_impartidos' 
                }
            },
            // 2.  (dar forma) al resultado
            {
                $project: {
                    _id: 1,
                    nombre_completo: { $concat: ['$nombre', ' ', '$apellido'] },
                    biografia: 1,
                    redes_sociales: 1,
                    // Cuenta cuántos cursos hay en el array 'cursos_impartidos'
                    numero_cursos_impartidos: { $size: '$cursos_impartidos' }
                }
            }
        ]);

        res.json(reporte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al generar el reporte', error: error.message });
    }
};

module.exports = {
    crearProfesor,
    obtenerProfesores,
    obtenerReporteProfesores,
};