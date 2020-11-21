const Company = require("../../core/models/Company"),
    INTENT_TYPES = require("../../core/constants/intent_types"),
    Intent = require("../../core/models/Intent");

module.exports = (req, res) => {
    const { token } = req.body;

    if (!token || !token.trim())
        return res.status(400).send({
            message: "Error: token can't be empty",
        });

    Intent.findOne({ token, email: req.session.user_email, type: INTENT_TYPES.INVITE_TO_COMPANY }, (err, intent) => {
        if (err || !intent)
            return res.status(200).send({
                message: "Your email token is outdated! Please get new email token",
            });

        Company.findOne({ _id: intent.objectId, isDeleted: false }, (err, company) => {
            if (err || !company)
                return res.status(404).send({
                    message: "Error: company ont found",
                });

            company.admins.push(req.session.user_id);
            company.save((err) => {
                if (err)
                    return res.status(500).send({
                        message: "Error: can't save company",
                    });

                intent.remove();
                res.status(200).send({ id: company._id });
            });
        });
    });
};
