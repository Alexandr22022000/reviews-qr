const Company = require('../../core/models/Company'),
    copyForm = require('../copy'),
    getFormById = require('../getFormById');

module.exports = (req, res) => {
    const {id, company_id} = req.body;

    if (!id || !id.trim() || !company_id || !company_id.trim())
        return res.status(400).send({
            message: "Error: id or company_id can't be empty",
        });

    getFormById(id, req.session.user_id)
        .then(({form}) => {
            Company.findOne({_id: company_id, $or: [{creatorId: req.session.user_id}, {admins: req.session.user_id}], isDeleted: false}, (err, Company) => {
                if (err || !Company)
                    return res.status(404).send({
                        message: "Error: company not found",
                    });

                copyForm(id, company_id)
                    .then(id => res.status(200).send({id}))
                    .catch(e => res.status(500).send({message: e}));
            });
        })
        .catch(e => {
            res.status(404).send({
                message: e,
            });
        });
};