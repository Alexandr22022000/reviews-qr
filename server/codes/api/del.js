const Code = require("../../core/models/Code"),
    getFormById = require("../../forms/getFormById");

module.exports = (req, res) => {
    const { id } = req.body;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    Code.findOne({ _id: id }, (err, code) => {
        if (err || !code)
            return res.status(404).send({
                message: "Error: code not found",
            });

        getFormById(code.formId, req.session.user_id)
            .then((form) => {
                Code.find({ formId: form._id }, (err, codes) => {
                    if (err || !codes)
                        return res.status(404).send({
                            message: "Error: codes not found",
                        });

                    if (codes.length <= 1)
                        return res.status(400).send({
                            message: "Error: it's last code for this form, can't delete all codes for form",
                        });

                    code.isDeleted = true;

                    code.save((err) => {
                        if (err)
                            return res.status(500).send({
                                message: "Error: can't save code",
                            });

                        res.status(200).send({});
                    });
                });
            })
            .catch((e) => {
                res.status(404).send({
                    message: e,
                });
            });
    });
};
