const mailer = require('../../core/mailer');

module.exports = (email, name, token) => {
    const msg = `Hello, ${name}!\nThank you for registration in ReviewsQR!\nTo finish you registration: ${token}\nIf you didn't register in ReviewsQR, please do nothing.`;

    return mailer({
        to: email,
        subject: "ReviewsSQ account registration",
        html: msg
    });
};