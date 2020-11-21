const UserModel = require("../../core/models/User"),
    bcrypt = require("bcrypt-nodejs");

module.exports = (req, res) => {
    let { password_old, password_new } = req.body;

    if (!password_old || !password_old.trim() || !password_new || !password_new.trim())
        return res.status(400).send({
            message: "Error: password_old or password_new can't be empty",
        });

    UserModel.findOne({ _id: req.session.user_id }, (err, User) => {
        if (err || !User)
            return res.status(500).send({
                message: "Error: user not found",
            });

        if (User.password && !bcrypt.compareSync(password_old, User.password))
            return res.status(200).send({
                message: "Invalid password",
            });

        password_new = bcrypt.hashSync(password_new, bcrypt.genSaltSync(8), null);
        User.password = password_new;

        User.save((err) => {
            if (err)
                return res.status(500).send({
                    message: "Error: can't save user",
                });

            res.status(200).send({});
        });
    });
};
