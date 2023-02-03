const { Router } = require('express');
const {
  register,
  login,
  findAllUsers,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', findAllUsers);

router.post('/signup', register);

router.post('/login', login);

module.exports = {
  userRoutes: router,
};
