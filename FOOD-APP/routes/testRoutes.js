const express = require('express');
const { testUserController } = require('../controllers/testController');

//router object
const router = express.Router()

//Routes

router.get('/test',testUserController)


//export
module.exports = router;