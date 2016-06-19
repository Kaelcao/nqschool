/**
 * Created by caoanhquan on 6/17/16.
 */
module.exports.login = function (req, res) {
    res.render("login", {title: "Đăng nhập vào tài khoản"});
};
module.exports.register = function (req, res) {
    res.render("register", {
        title: "Đăng kí tài khoản",
        selected: "Đăng ký",
        csrf: req.csrfToken(),
        host:process.env.HOST
    });
};
