const getFormById = require("../getFormById");

module.exports = (req, res) => {
    const { id, name, img, style, msg } = req.body;

    if (!id || !id.trim() || !name || !name.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    getFormById(id, req.session.user_id)
        .then(({ form }) => {
            form.name = name;
            form.img = img;
            if (style) form.style = style;
            if (msg) form.outMsg = msg;

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
