const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  nombre: {
    type: String,
    require: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    require: [true, 'El email es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'El password es obligatorio'],
  },
  img: {
    type: String,
    required: false,
  },
  rol: {
    type: String,
    require: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// no mostrar password en el objeto json

UserSchema.methods.toJSON = function () {
  // debe ser una funcion normal, no una funcion de flecha
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

module.exports = model('Usuario', UserSchema);
