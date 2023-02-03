const { Router } = require('express');
const { transferAmount } = require('../controllers/transfer.controller');

const router = Router();

router.post('/:id', transferAmount);

module.exports = {
  transferRoutes: router,
};
