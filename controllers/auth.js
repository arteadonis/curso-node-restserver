const { response } = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no es válido',
      });
    }

    // Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario no está activo',
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'El password no es correcto',
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  login,
};
