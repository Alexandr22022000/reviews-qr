const mailer = require('../../core/mailer');

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

module.exports = (email, name, token) => {
    let url = DOMAIN + '/signup_confirm?token=' + token;

    const msg = `
        Hello, ${name}!
        Thank you for registration in ReviewsQR!
        To finish you registration: <a href="${url}">${url}</a>
        If you didn't register in ReviewsQR, please do nothing.
    `;

    return mailer({
        to: email,
        subject: "ReviewsSQ account registration",
        html: msg
    });
};