const getFormById = require("../getFormById");

module.exports = (req, res) => {
    const { id } = req.body;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    getFormById(id, req.session.user_id)
        .then(({ form, companies }) => {
            let isMy = false;
            if (form.creatorId + "" === req.session.user_id + "") isMy = true;
            if (!isMy)
                companies.forEach((company) => {
                    if (form.creatorId + "" === company._id + "") isMy = true;
                });

            if (isMy) form.isDeleted = true;
            else form.admins = form.admins.filter((admin) => admin + "" !== req.session.user_id) + "";

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
