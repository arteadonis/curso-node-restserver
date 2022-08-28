const Role = require('../models/role');
const Usuario = require('../models/usuarios');

const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExisteBD = async (email) => {
  const emailExiste = await Usuario.findOne({ email });
  if (emailExiste) {
    throw new Error(`El email ${email} ya existe en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findOne({ id });
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

module.exports = {
  esRoleValido,
  emailExisteBD,
  existeUsuarioPorId
};
