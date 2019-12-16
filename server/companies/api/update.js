const Company = require('../../core/models/Company');

module.exports = (req, res) => {
    const {id, name, email, img} = req.body;

    if (!id || !id.trim() || !name || !name.trim() || !email || !email.trim() || !img || !img.trim())
        return res.status(400).send({
            message: "Error: id, name, email or img can't be empty",
        });

    Company.findOne({_id: id, $or: [{creatorId: req.session.user_id}, {admins: req.session.user_id}], isDeleted: false}, (err, company) => {
        if (err || !company)
            return res.status(404).send({
                message: "Error: company ont found",
            });

        company.name = name;
        company.email = email;
        company.img = img;

        company.save(err => {
            if (err)
                return res.status(500).send({
                    message: "Error: can't save company",
                });

            res.status(200).send({});
        });
    });
};