const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre_completo: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // No puede haber dos usuarios con el mismo email
        trim: true,
        lowercase: true // Para que guarde siempre en minúsculas
    },
    contraseña: {
        type: String,
        required: true,
    },
    // Array de referencias a Cursos (los cursos en los que el usuario se inscribió)
    cursos_inscritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    }],
}, {
    timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;