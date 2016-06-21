var mongoose = require('mongoose');

var dbUri = "mongodb://localhost/nqschool";

mongoose.connect(dbUri);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbUri);
});
mongoose.connection.on('error', function (e) {
    console.log('Mongoose connection error ' + e);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

var shutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};


// For nodemon restarts
process.once('SIGUSR2', function () {
    shutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function () {
    shutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    shutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('../models/User');