const Company = require("../../core/models/Company"),
    User = require("../../core/models/User"),
    reject_admin_email = require("../emails/reject_admin");

module.exports = (req, res) => {
    const { id, admin_id } = req.body;

    if (!id || !id.trim() || !admin_id || !admin_id.trim())
        return res.status(400).send({
            message: "Error: id or admin_id can't be empty",
        });

    Company.findOne({ _id: id, creatorId: req.session.user_id, isDeleted: false }, (err, company) => {
        if (err || !company)
            return res.status(404).send({
                message: "Error: company ont found",
            });

        company.admins = company.admins.filter((admin) => admin + "" !== admin_id + "");
        company.save((err) => {
            if (err)
                return res.status(500).send({
                    message: "Error: can't save company",
                });

            User.findOne({ id: admin_id }, (err, user) => {
                if (err || !user) return;
                reject_admin_email(user.email, company.name, req.session.user_name);
            });

            res.status(200).send({});
        });
    });
};
