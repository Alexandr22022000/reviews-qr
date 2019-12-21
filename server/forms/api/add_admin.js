const Form = require('../../core/models/Form'),
    INTENT_TYPES = require('../../core/constants/intent_types'),
    Intent = require('../../core/models/Intent');

module.exports = (req, res) => {
    const {token} = req.body;

    if (!token || !token.trim())
        return res.status(400).send({
            message: "Error: token can't be empty",
        });

    Intent.findOne({token, email: req.session.user_email, type: INTENT_TYPES.INVITE_TO_FORM}, (err, intent) => {
        if (err || !intent)
            return res.status(200).send({
                message: "Your email token is outdated! Please get new email token",
            });

        Form.findOne({_id: intent.objectId, isDeleted: false}, (err, form) => {
            if (err || !form)
                return res.status(404).send({
                    message: "Error: form ont found",
                });

            form.admins.push(req.session.user_id);
            form.save(err => {
                if (err)
                    return res.status(500).send({
                        message: "Error: can't save intent",
                    });

                intent.remove();
                res.status(200).send({id: form._id});
            });
        });
    });
};