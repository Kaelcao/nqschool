var passport = require('passport');
var mongoose = require('mongoose');
var helpers = require("../utils/helpers");
var User = mongoose.model('User');

module.exports.login = function (req, res) {
    if(!req.body.email || !req.body.password){
        helpers.sendJsonResponse(res,400,{
            message:"Bạn vui lòng nhập email và mật khẩu"
        });
        return;
    }
    passport.authenticate("local",function(err,user,info){
        var token;
        if (err){
            helpers.sendJsonResponse(res,404,err);
            return;
        }
        if (user){
            token = user.generateJwt();
            helpers.sendJsonResponse(res,200,{token:token});
        } else{
            helpers.sendJsonResponse(res,401,info);
        }
    })(req,res);
};

module.exports.register = function (req, res) {
    if (!req.body.gender || !req.body.name || !req.body.email || !req.body.password || !req.body.dob || !req.body.phone) {
        helpers.sendJsonResponse(res, 400, {message: "Bạn vui lòng điền hết tất cả các trường"});
        return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.gender = req.body.gender;
    user.role = process.env.ROLE_STUDENT;
    user.school = req.body.school;
    user.dob = new Date(req.body.dob);
    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        if (err) {
            helpers.sendJsonResponse(res, 404, err);
        } else {
            token = user.generateJwt();
            helpers.sendJsonResponse(res, 200, {
                token: token
            });
        }
    });
};