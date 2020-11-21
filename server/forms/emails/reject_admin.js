const mailer = require("../../core/mailer");

module.exports = (email, formName, name) => {
    const msg = `
        Hello!
        You was rejected from form ${formName} by user ${name}.
        If you think that it was mistakenly, please contact with user.
    `;

    return mailer({
        to: email,
        subject: "ReviewsSQ form rejection",
        html: msg,
    });
};
