const mailer = require("../../core/mailer");

const DOMAIN = process.env.DOMAIN || "http://localhost:3000";

module.exports = (email, formName, name, token) => {
    let url = DOMAIN + "/email/form-admin?token=" + token;

    const msg = `
        Hello!
        You got invitation to form ${formName} by user ${name}
        For join to form follow this link: <a href="${url}">${url}</a>
        If you don't want to join to form, please do nothing.
    `;

    return mailer({
        to: email,
        subject: "ReviewsSQ form invitation",
        html: msg,
    });
};
