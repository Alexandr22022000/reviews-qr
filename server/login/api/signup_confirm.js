const UserModel = require('../../core/models/User'),
    IntentModel = require('../../core/models/Intent'),
    {consoleLog} = require('../../core/logs'),
    IMAGES = require('../../core/constants/images'),
    INTENT = require('../../core/constants/intent_types');

module.exports = (req, res) => {
    let {token} = req.body;

    if (!token || !token.trim())
        return res.status(400).send({
            message: "Error: token can't be empty"
        });

    IntentModel.findOne({token, type: INTENT.CREATE_USER}, (err, Intent) => {
        if (err || !Intent)
            return res.status(200).send({
                message: "Your email token is outdated! Please get new email token"
            });

        const User = new UserModel({
            email: Intent.email,
            password: Intent.data.password,
            name: Intent.data.name,
            img: IMAGES.USER_DEFAULT,
        });

        User.save(err => {
            if (err) {
                consoleLog("Can't save user! Error:");
                consoleLog(err);
                return res.status(500).send({
                    message: "Error: can't save user"
                });
            }

            req.session.user_id = User._id;
            res.status(200).send({
                email: Intent.email,
                name: Intent.data.name,
                img: IMAGES.USER_DEFAULT,
            });
        });
    });
};