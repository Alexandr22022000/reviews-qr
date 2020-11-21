const UserModel = require("../../core/models/User"),
    IntentModel = require("../../core/models/Intent"),
    { consoleLog } = require("../../core/logs"),
    bcrypt = require("bcrypt-nodejs"),
    IMAGES = require("../../core/constants/images"),
    INTENT = require("../../core/constants/intent_types");

module.exports = (req, res) => {
    let { token, password } = req.body;

    if (!token || !token.trim() || !password || !password.trim())
        return res.status(400).send({
            message: "Error: token or password can't be empty",
        });

    IntentModel.findOne({ token, type: INTENT.RESTORE_PASSWORD }, (err, Intent) => {
        if (err || !Intent)
            return res.status(200).send({
                message: "Your email token is outdated! Please get new email token",
            });

        UserModel.findOne({ _id: Intent.userId }, (err, User) => {
            if (err || !User)
                return res.status(500).send({
                    message: "Error: User not found",
                });

            password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            User.password = password;

            User.save((err) => {
                if (err) {
                    consoleLog("Can't save user! Error:");
                    consoleLog(err);
                    return res.status(500).send({
                        message: "Error: can't save user",
                    });
                }

                Intent.remove();
                req.session.user_id = User._id;
                req.session.user_email = User.email;
                req.session.user_name = User.name;
                res.status(200).send({
                    email: User.email,
                    name: User.name,
                    img: IMAGES.USER_DEFAULT,
                });
            });
        });
    });
};
