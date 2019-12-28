const CompanyModel = require('../../core/models/Company'),
    UserModel = require('../../core/models/User');

module.exports = (req, res) => {
    const {id} = req.query;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    CompanyModel.findOne({_id: id, $or: [{creatorId: req.session.user_id}, {admins: req.session.user_id}], isDeleted: false}, (err, Company) => {
        if (err || !Company)
            return res.status(404).send({
                message: "Error: company not found",
            });

        const admins = Company.admins.map(admin => ({_id: admin}));
        admins.push({_id: Company.creatorId});
        UserModel.find({$or: admins}, (err, users) => {
            if (err || !users)
                return res.status(404).send({
                    message: "Error: admins not found",
                });

            users = users.map(User => ({
                id: User._id,
                name: User.name,
                img: User.img,
                isCreator: User._id +"" === Company.creatorId +"",
            }));

            res.status(200).send({
                id: Company._id,
                name: Company.name,
                img: Company.img,
                email: Company.email,
                isCreator: Company.creatorId +"" === req.session.user_id +"",
                admins: users,
            });
        });
    });
};