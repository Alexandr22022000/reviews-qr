const getFormById = require("../getFormById");

module.exports = (req, res) => {
    const { id, questions } = req.body;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    getFormById(id, req.session.user_id)
        .then(({ form }) => {
            form.questions = questions;

            form.save((err) => {
                if (err)
                    return res.status(500).send({
                        message: "Error: can't save form",
                    });

                res.status(200).send({});
            });
        })
        .catch((e) => {
            res.status(404).send({
                message: e,
            });
        });
};
