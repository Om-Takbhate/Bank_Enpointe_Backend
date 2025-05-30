const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/customers', auth, userController.getAllCustomers);
router.get('/transactions/:userId', auth, userController.getUserTransactions);

module.exports = router;
