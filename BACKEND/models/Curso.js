const mongoose = require('mongoose');

const cursoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true, // No puede haber dos cursos con el mismo nombre
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    // Referencia al modelo Profesor (esto "une" la entidad Curso con Profesor)
    profesor: {
        type: mongoose.Schema.Types.ObjectId, // ID del profesor
        ref: 'Profesor', 
        required: true,
    },
    duracion_horas: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        default: 0
    },
    cupo_disponible: {
        type: Number,
        required: true,
        default: 1
    },
    tags: {
        type: [String], 
        default: [],
    },
}, {
    timestamps: true
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;