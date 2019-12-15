const IntentModel = require('../../core/models/Intent'),
    UserModel = require('../../core/models/User'),
    bcrypt = require('bcrypt-nodejs'),
    checkRecaptcha = require('../../core/recaptcha'),
    signupEmail = require('../emails/signup'),
    {consoleLog} = require('../../core/logs'),
    INTENT = require('../../core/constants/intent_types');

module.exports = (req, res) => {
    let {email, password, name, recaptcha} = req.body;

    if (!email || !email.trim() || !password || !password.trim() || !name || !name.trim())
        return res.status(400).send({
            message: "Error: email, password or name can't be empty"
        });

    checkRecaptcha(recaptcha, req.connection.remoteAddress).then(success => {
        if (!success)
            return res.status(200).send({
                message: "Proof that you are not robot"
            });

        UserModel.findOne({email}, (err, User) => {
            if (err || User)
                return res.status(200).send({
                    message: "Email is used already"
                });

            password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

            const Intent = new IntentModel({
                type: INTENT.CREATE_USER,
                email,
                data: {name, password},
            });

            signupEmail(email, name, Intent.token).then(() => {
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