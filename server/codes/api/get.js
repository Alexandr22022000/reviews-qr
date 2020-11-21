const Code = require("../../core/models/Code"),
    getFormById = require("../../forms/getFormById");

module.exports = (req, res) => {
    const { id } = req.query;

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
                res.status(200).send({
                    name: code.name,
                    img: code.img,
                    description: code.description,
                    type: code.type,
                    style: code.style,
                    link: code.link,
                });
            })
            .catch((e) => {
                res.status(404).send({
                    message: e,
                });
            });
    });
};
