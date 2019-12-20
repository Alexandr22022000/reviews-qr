const User = require('../../core/models/User'),
    getFormById = require('../getFormById');

module.exports = (req, res) => {
    const {id} = req.query;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    getFormById(id, req.session.user_id)
        .then((form, companies) => {

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
        })
        .catch(e => {
            res.status(404).send({
                message: e,
            });
        });
};