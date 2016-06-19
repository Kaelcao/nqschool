var express = require('express');
var AuthController = require("../controllers/Auth");
var router = express.Router();

router.post('/login',AuthController.login);
router.post('/register',AuthController.register);

module.exports = router;
