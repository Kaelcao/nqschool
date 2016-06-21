var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
/**
 * Created by caoanhquan on 6/17/16.
 */
module.exports.login = function (req, res, next) {
    var loginMessage = req.flash('loginMessage');
    var data = {
        title: "Đăng nhập vào tài khoản",
        csrf: req.csrfToken(),
        message: loginMessage,
        selected: "Đăng nhập"
    };
    res.render("login", data);
};

var createUser = function (req, res, next) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.phone = req.body.phone;
    user.dob = new Date(req.body.dob);
    user.gender = req.body.gender;
    user.role = process.env.ROLE_STUDENT;

    user.save(function (err) {
        if (err) {
            console.log(err);
            req.flash('registerMessage', 'Có lỗi xảy ra');
            return res.redirect('dang-ky');
        } else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        }
    });
};

module.exports.processRegister = function (req, res, next) {
    if (!req.body.gender || !req.body.name || !req.body.email || !req.body.password || !req.body.dob || !req.body.phone) {
        req.flash('registerMessage', "Bạn vui lòng điền hết tất cả các trường");
        return res.redirect('dang-ky');
    }
    if (req.body.password != req.body.confirmPassword) {
        req.flash('registerMessage', "Mật khẩu và xác nhận mật khẩu chưa trùng khớp");
        return res.redirect('dang-ky');
    }
    User
        .find({email: req.body.email})
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (user.length > 0) {
                req.flash('registerMessage', 'Email đã tồn tại');
                return res.redirect('/dang-ky');
            }
            return createUser(req, res, next);
        });


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

module.exports.logOut = function (req, res) {
    req.logout();
    res.redirect("/");
}

module.exports.register = function (req, res) {
    var registerMessage = req.flash('registerMessage');
    res.render("register", {
        title: "Đăng kí tài khoản",
        selected: "Đăng ký",
        message: registerMessage,
        csrf: req.csrfToken(),
        host: process.env.HOST
    });
};
