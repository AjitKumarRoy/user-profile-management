const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', authMiddleware, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);
router.get('/logout', profileController.logout);


module.exports = router;