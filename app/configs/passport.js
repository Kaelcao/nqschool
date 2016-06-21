'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, done);
});


// load strategies
require('../../common/config/passport');
