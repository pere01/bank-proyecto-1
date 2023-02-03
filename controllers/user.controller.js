const User = require('../models/user.model');

// Creamos una constante de registro
const register = async (req, res) => {
  try {
    // Traemos los datos necesarios del body
    const { name, password } = req.body;

    // El accountNumber tiene que ser random
    const accountNumber = Math.round(Math.random() * 999999);

    // El monto inicial de todos los usuarios son de 1000
    const amount = 1000;

    // Creamos una constante para que el usuario pueda registrarse desde el body
    const newUser = await User.create({
      name,
      password,
      accountNumber,
      amount,
    });

    // Le enviamos al cliente que todo fue bien
    res.status(201).json({
      status: 'success',
      message: 'Successfully registered user',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

// Constante para que los usuarios puedan logearse
const login = async (req, res) => {
  try {
    // Traemos del body el numero de cuenta y la contraseña
    const { accountNumber, password } = req.body;

    // Buscamos al usuario que se quiera logear
    const loginUser = await User.findOne({
      where: {
        status: true,
        accountNumber: accountNumber,
        password: password,
      },
    });

    // Si los datos son diferentes salta un error
    if (!loginUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Le enviamos al cliente que todo fue bien
    res.json({
      status: 'success',
      message: 'User successfully logged in',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

module.exports = {
  register,
  login,
};
