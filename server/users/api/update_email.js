const UserModel = require('../../core/models/User'),
    IntentModel = require('../../core/models/Intent'),
    {consoleLog} = require('../../core/logs'),
    INTENT = require('../../core/constants/intent_types');

module.exports = (req, res) => {
    let {token} = req.body;

    if (!token || !token.trim())
        return res.status(400).send({
            message: "Error: token can't be empty"
        });

    IntentModel.findOne({token, type: INTENT.UPDATE_EMAIL, userId: req.session.user_id}, (err, intent) => {
        if (err || !intent)
            return res.status(200).send({
                message: "Your email token is outdated! Please get new email token"
            });

        UserModel.findOne({_id: req.session.user_id}, (err, User) => {
            if (err || !User)
                return res.status(500).send({
                    message: "Error: User not found"
                });

            User.email = intent.email;
            User.save(err => {
                if (err) {
                    consoleLog("Can't save user! Error:");
                    consoleLog(err);
                    return res.status(500).send({
                        message: "Error: can't save user"
                    });
                }

                intent.remove();
                req.session.user_email = intent.email;
                res.status(200).send({});
            });
        });
    });
};