const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, transactionController.getTransactions);
router.post('/deposit', auth, transactionController.deposit);
router.post('/withdraw', auth, transactionController.withdraw);

module.exports = router;
