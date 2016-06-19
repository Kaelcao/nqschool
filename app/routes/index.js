var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/Home');
var AuthController = require("../controllers/Auth");
/* GET home page. */
router.get('/', HomeController.index);
router.get('/login', AuthController.login);
router.get('/register',AuthController.register);
module.exports = router;

