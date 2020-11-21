const Code = require("../../core/models/Code"),
    getFormById = require("../../forms/getFormById");

module.exports = (req, res) => {
    const { form_id } = req.query;

    if (!form_id || !form_id.trim())
        return res.status(400).send({
            message: "Error: form_id can't be empty",
        });

    getFormById(form_id, req.session.user_id)
        .then((form) => {
            Code.find({ formId: form_id }, (err, codes) => {
                if (err || !codes)
                    return res.status(404).send({
                        message: "Error: codes not found",
                    });

                codes = codes.map((code) => ({
                    id: code._id,
                    name: code.name,
                    img: code.img,
                }));

                res.status(200).send({
                    codes,
                    form_name: form.name,
                });
            });
        })
        .catch((e) => {
            res.status(404).send({
                message: e,
            });
        });
};
