const UserModel = require('../../core/models/User');

module.exports = (req, res) => {
    UserModel.findOne({_id: req.session.user_id}, (err, User) => {
        if (err || !User)
            return res.status(500).send({
                message: "User not found",
            });

        res.status(200).send({
            name: User.name,
            email: User.email,
            img: User.img,
        });
    });
};