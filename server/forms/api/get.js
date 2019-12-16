const Company = require('../../core/models/Company'),
    Form = require('../../core/models/Form'),
    User = require('../../core/models/User');

module.exports = (req, res) => {
    const {id} = req.query;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    Company.find({$or: [{creatorId: req.session.user_id}, {admins: req.session.user_id}], isDeleted: false}, (err, companies) => {
        if (err || !companies)
            return res.status(404).send({
                message: "Error: company not found",
            });

        let companiesFilter = companies.map(company => ({creatorId: company._id}));

        Form.findOne({_id: id, $or: [{creatorId: req.session.user_id}, {admins: req.session.user_id}, ...companiesFilter], isDeleted: false}, (err, form) => {
            if (err || !form)
                return res.status(404).send({
                    message: "Error: form not found",
                });

            let mainObj = form;
            companies.forEach(company => {
                if (company._id === form.creatorId) {
                    mainObj = company;
                }
            });

            let admins = mainObj.admins;
            admins.push(mainObj.creatorId);
            admins = admins.map(admin => ({_id: admin}));
            User.find({$or: admins}, (err, users) => {
                if (err || !users)
                    return res.status(404).send({
                        message: "Error: admins not found",
                    });

                users = users.map(User => ({
                    id: User._id,
                    name: User.name,
                    img: User.img,
                    isCreator: User._id === mainObj.creatorId,
                }));

                res.status(200).send({
                    id: form._id,
                    name: form.name,
                    img: form.img,
                    isCreator: mainObj.creatorId === req.session.user_id,
                    companyName: mainObj._id === form._id ? null : mainObj.name,
                    admins: users,
                    outMsg: form.outMsg,
                    style: form.style,
                    questions: form.questions,
                });
            });
        });
    });
};