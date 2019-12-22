const IntentModel = require('../../core/models/Intent'),
    update_email = require('../emails/update_email'),
    {consoleLog} = require('../../core/logs'),
    INTENT = require('../../core/constants/intent_types');

module.exports = (req, res) => {
    const {email} = req.body;

    if (!email || !email.trim())
        return res.status(400).send({
            message: "Error: emails can't be empty"
        });

    const Intent = new IntentModel({
        type: INTENT.UPDATE_EMAIL,
        email: email,
        userId: req.session.user_id,
    });

    update_email(email, req.session.user_name, Intent.token).then(() => {
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
};