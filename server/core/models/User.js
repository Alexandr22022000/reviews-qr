const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    img: String,
    createdAt: Date,
    googleToken: String,
});

userSchema.path('createdAt').default(() => new Date());

module.exports = mongoose.model('User', userSchema);