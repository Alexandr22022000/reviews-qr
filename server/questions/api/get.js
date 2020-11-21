const Form = require("../../core/models/Form"),
    Code = require("../../core/models/Code");

module.exports = (req, res) => {
    const { link } = req.query;

    if (!link || !link.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    Code.findOne({ link }, (err, code) => {
        if (err || !code)
            return res.status(404).send({
                message: "Error: code not found",
            });

        Form.findOne({ _id: code.formId }, (err, form) => {
            if (err || !form)
                return res.status(404).send({
                    message: "Error: form not found",
                });

            res.status(200).send({
                questions: form.questions.filter((question) => !question.isDeleted),
                msg: form.msg,
                style: form.style,
            });
        });
    });
};
