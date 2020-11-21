const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    img: String,
    createdAt: Date,
    googleToken: String,
    isDeleted: Boolean,
});

userSchema.path("createdAt").default(() => new Date());

module.exports = mongoose.model("User", userSchema);
