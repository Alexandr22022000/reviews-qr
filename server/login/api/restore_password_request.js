const IntentModel = require('../../core/models/Intent'),
    UserModel = require('../../core/models/User'),
    checkRecaptcha = require('../../core/recaptcha'),
    passwordRestoreEmail = require('../emails/passwordRestore'),
    {consoleLog} = require('../../core/logs'),
    INTENT = require('../../core/constants/intent_types');

module.exports = (req, res) => {
    let {email, recaptcha} = req.body;

    if (!email || !email.trim())
        return res.status(400).send({
            message: "Error: email can't be empty"
        });

    checkRecaptcha(recaptcha, req.connection.remoteAddress).then(success => {
        if (!success)
            return res.status(200).send({
                message: "Proof that you are not robot"
            });

        UserModel.findOne({email}, (err, User) => {
            if (err || !User)
                return res.status(200).send({
                    message: "User not found"
                });

            const Intent = new IntentModel({
                type: INTENT.RESTORE_PASSWORD,
                email: User.email,
                userId: User._id,
            });

            passwordRestoreEmail(email, User.name, Intent.token).then(() => {
                Intent.save(err => {
                    if (err) {
                        consoleLog("Can't save intent! Error:");
                        consoleLog(err);
                        return res.status(500).send({
                            message: "Error: can't save intent"
                        });
                    }

                    res.status(200).send({});
                });
            }).catch(e => {
                res.status(500).send({
                    message: "Error: can't send email"
                });
            });
        });
    });
};