const mailer = require("../../core/mailer");

module.exports = (email, companyName, name) => {
    const msg = `
        Hello!
        You was rejected from company ${companyName} by user ${name}.
        If you think that it was mistakenly, please contact with user.
    `;

    return mailer({
        to: email,
        subject: "ReviewsSQ company rejection",
        html: msg,
    });
};
