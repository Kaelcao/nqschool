/**
 * Created by caoanhquan on 6/21/16.
 */
module.exports.loggedIn = function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/dang-nhap');
    }
}
