var passport = require('passport');
/**
 * Created by caoanhquan on 6/17/16.
 */
module.exports.login = function (req, res, next) {
    var loginMessage = req.flash('loginMessage');
    console.log(loginMessage);
    var data = {
        title: "Đăng nhập vào tài khoản",
        csrf: req.csrfToken(),
        message: loginMessage
    }
    res.render("login", data);
};

module.exports.processLogin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', info.message);
            return res.redirect('/dang-nhap');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

module.exports.logOut = function(req,res){
    req.logout();
    res.redirect("/");
}

module.exports.register = function (req, res) {
    res.render("register", {
        title: "Đăng kí tài khoản",
        selected: "Đăng ký",
        csrf: req.csrfToken(),
        host: process.env.HOST
    });
};
