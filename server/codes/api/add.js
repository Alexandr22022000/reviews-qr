const Code = require('../../core/models/Code'),
    IMAGES = require('../../core/constants/images'),
    CODE_TYPES = require('../../core/constants/code_types'),
    STYLE = require('../../core/constants/styles'),
    getFormById = require('../../forms/getFormById');

module.exports = (req, res) => {
    const {form_id, name} = req.body;

    if (!form_id || !form_id.trim() || !name || !name.trim())
        return res.status(400).send({
            message: "Error: form_id and name can't be empty",
        });

    getFormById(form_id, req.session.user_id)
        .then(form => {
            const code = new Code({
                formId: form_id,
                name,
                img: IMAGES.CODE_DEFAULT,
                description: "",
                type: CODE_TYPES.DEFAULT,
                style: STYLE,
            });

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
};