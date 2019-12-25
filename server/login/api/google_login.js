const UserModel = require('../../core/models/User');

module.exports = (req, res) => {
    const {token, name, email, img} = req.body;

    if (!email || !email.trim() || !name || !name.trim() || !token || !token.trim())
        return res.status(400).send({
            message: "Error: token, email or name can't be empty"
        });

    UserModel.findOne({email}, (err, User) => {
        if (!err && User) {
            if (User.googleToken === token) {
                req.session.user_id = User._id;
                return res.status(200).send({
                    name: User.name,
                    email: User.email,
                    img: User.img,
                });
            }

            return res.status(200).send({
                message: "Incorrect google token",
            });
        }

        const UserNew = new UserModel({
            email,
            name,
            img,
            googleToken: token,
        });

        UserNew.save();

        req.session.user_id = UserNew._id;
        res.status(200).send({
            name: UserNew.name,
            email: UserNew.email,
            img: UserNew.img,
        });
    });
};