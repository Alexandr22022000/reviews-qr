const Company = require('../../core/models/Company'),
    IMAGES = require('../../core/constants/images');

module.exports = (req, res) => {
    const {name} = req.body;

    if (!name || !name.trim())
        return res.status(400).send({
            message: "Error: name can't be empty",
        });

    const company = new Company({
        name,
        img: IMAGES.COMPANY_DEFAULT,
        email: req.session.user_email,
        admins: [],
        creatorId: req.session.user_id,
    });

    company.save(err => {
        if (err)
            return res.status(500).send({
                message: "Error: can't save company",
            });

        res.status(200).send({id: company._id});
    });
};