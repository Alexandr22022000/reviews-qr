const Company = require('../../core/models/Company');

module.exports = (req, res) => {
    const {id} = req.body;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    Company.findOne({_id: id, $or: [{creatorId: req.session.user_id}, {admins: req.session.user_id}], isDeleted: false}, (err, company) => {
        if (err || !company)
            return res.status(404).send({
                message: "Error: company ont found",
            });

        if (company.creatorId +'' === req.session.user_id +'') {
            company.isDeleted = true;
        }
        else {
            company.admins = company.admins.filter(admin => admin !== req.session.user_id);
        }

        company.save(err => {
            if (err)
                return res.status(500).send({
                    message: "Error: can't save company",
                });

            res.status(200).send({});
        });
    });
};