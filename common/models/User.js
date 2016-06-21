/**
 * Created by caoanhquan on 6/17/16.
 */
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto;
try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}

var paidSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    note: String,
    time: {
        type: Date,
        default: Date.now()
    }
});

var registerSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paids: [paidSchema]

});

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type:String,
        require:true
    },
    dob: {
        type: Date,
        required: true
    },
    school: String,
    rank: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    facebook: String,
    role: {
        type: String,
        required: true
    },
    salt: String,
    hash: String,
    registers: [registerSchema]
}, {timestamps: true});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(256).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString("hex");
};
userSchema.methods.validatePassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString("hex");
    return hash === this.hash;
};
userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);
};
mongoose.model("User", userSchema);