const Company = require('../../core/models/Company'),
    Form = require('../../core/models/Form');

module.exports = (req, res) => {
    const {id, name, img, style, outMsg} = req.body;

    if (!id || !id.trim() || !name || !name.trim())
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

            form.name = name;
            form.img = img;
            if (style) form.style = style;
            if (outMsg) form.outMsg = outMsg;

            form.save(err => {
                if (err)
                    return res.status(500).send({
                        message: "Error: can't save form",
                    });

                res.status(200).send({});
            });
        });
    });
};