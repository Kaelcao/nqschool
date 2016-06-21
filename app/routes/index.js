var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/Home');
var AuthController = require("../controllers/Auth");
var loggedIn = require("../middlewares/auth").loggedIn;

/* GET home page. */
router.get('/', HomeController.index);

router.get('/dang-nhap', AuthController.login);
router.post('/process-login', AuthController.processLogin);
router.get('/dang-ky',loggedIn ,AuthController.register);
router.get('/dang-xuat',AuthController.logOut);


module.exports = router;

