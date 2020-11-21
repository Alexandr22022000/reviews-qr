const Answer = require("../../core/models/Answer"),
    Code = require("../../core/models/Code");

module.exports = (req, res) => {
    const { link, answers, customer_id } = req.body;

    if (!link || !link.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    Code.findOne({ link }, (err, code) => {
        if (err || !code)
            return res.status(404).send({
                message: "Error: code not found",
            });

        const answer = new Answer({
            codeId: code._id,
            customerId: customer_id,
            customerIp: req.connection.remoteAddress,
            answers,
        });

        answer.save((err) => {
            if (err)
                return res.status(500).send({
                    message: "Error: can't save answer",
                });

            res.status(200).send({});
        });
    });
};
