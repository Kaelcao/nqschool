/**
 * Created by caoanhquan on 6/17/16.
 */
module.exports.index = function (req, res) {
    res.render('index', {
    	title: "nqschool",
		selected: "",
    });
};