const UserModel = require('../../core/models/User'),
    bcrypt = require('bcrypt-nodejs');

module.exports = (req, res) => {
    const {email, password} = req.body;

    if (!email || !email.trim() || !password || !password.trim())
        return res.status(400).send({
            message: "Error: email or password can't be empty"
        });

    UserModel.findOne({email}, (err, User) => {
        if (err || !User)
            return res.status(200).send({
                message: "Invalid email",
            });

        if (!User.password || !bcrypt.compareSync(password, User.password))
            return res.status(200).send({
                message: "Invalid password",
            });
        
        req.session.user_id = User._id;
        req.session.user_email = User.email;
        req.session.user_name = User.name;
        res.status(200).send({
            name: User.name,
            email: User.email,
            img: User.img,
        });
    });
};