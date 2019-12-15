const mailer = require('../../core/mailer');

module.exports = (email, name, token) => {
    const msg = `Hello, ${name}!\nFor restore your password: ${token}\nIf you didn't try to restore password in ReviewsQR, please do nothing.`;

    return mailer({
        to: email,
        subject: "ReviewsSQ password restore",
        html: msg
    });
};