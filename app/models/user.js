var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    }
});

// Generation a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// Checking if password in valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);