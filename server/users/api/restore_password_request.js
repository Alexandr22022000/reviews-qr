const IntentModel = require("../../core/models/Intent"),
    passwordRestoreEmail = require("../../login/emails/passwordRestore"),
    { consoleLog } = require("../../core/logs"),
    INTENT = require("../../core/constants/intent_types");

module.exports = (req, res) => {
    const Intent = new IntentModel({
        type: INTENT.RESTORE_PASSWORD,
        email: req.session.user_email,
        userId: req.session.user_id,
    });

    passwordRestoreEmail(req.session.user_email, req.session.user_name, Intent.token)
        .then(() => {
            Intent.save((err) => {
                if (err) {
                    consoleLog("Can't save intent! Error:");
                    consoleLog(err);
                    return res.status(500).send({
                        message: "Error: can't save intent",
                    });
                }

                res.status(200).send({});
            });
        })
        .catch((e) => {
            res.status(500).send({
                message: "Error: can't send emails",
            });
        });
};
