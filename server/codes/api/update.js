const Code = require('../../core/models/Code'),
    getFormById = require('../../forms/getFormById');

module.exports = (req, res) => {
    const {id, name, img, description, style, type} = req.body;

    if (!id || !id.trim() || !name || !name.trim())
        return res.status(400).send({
            message: "Error: id and name can't be empty",
        });

    Code.findOne({_id: id}, (err, code) => {
        if (err || !code)
            return res.status(404).send({
                message: "Error: code not found",
            });

        getFormById(code.formId, req.session.user_id)
            .then(form => {
                code.name = name;
                code.img = img;
                code.description = description;
                code.type = type;
                if (style) code.styles = style;

                code.save(err => {
                    if (err)
                        return res.status(500).send({
                            message: "Error: can't save code",
                        });

                    res.status(200).send({});
                });
            })
            .catch(e => {
                res.status(404).send({
                    message: e,
                });
            });
    });
};