const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema =  mongoose.Schema;
let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido'
}

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    required: [true, 'Campo requerido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'contraseña Obligatoria']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
    
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} debe ser unico'
})

module.exports = mongoose.model('Usuario', usuarioSchema);