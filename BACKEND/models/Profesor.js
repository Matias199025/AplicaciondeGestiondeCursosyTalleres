const mongoose = require('mongoose');

const profesorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    biografia: {
        type: String,
        default: ''
    },
    redes_sociales: {
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' },
    },
}, {
    timestamps: true 
});

const Profesor = mongoose.model('Profesor', profesorSchema);
module.exports = Profesor;