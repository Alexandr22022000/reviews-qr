const mailer = require('../../core/mailer');

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

module.exports = (email, companyName, name, token) => {
    let url = DOMAIN + '/email/company-admin?token=' + token;

    const msg = `
        Hello!
        You got invitation to company ${companyName} by user ${name}
        For join to company follow this link: <a href="${url}">${url}</a>
        If you don't want to join to company, please do nothing.
    `;

    return mailer({
        to: email,
        subject: "ReviewsSQ company invitation",
        html: msg
    });
};