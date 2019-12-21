const Form = require('../../core/models/Form'),
    Intent = require('../../core/models/Intent'),
    INTENT_TYPES = require('../../core/constants/intent_types'),
    invite_admin_email = require('../emails/invate_admin');

module.exports = (req, res) => {
    const {id, email} = req.body;

    if (!id || !id.trim() || !email || !email.trim())
        return res.status(400).send({
            message: "Error: id or email can't be empty",
        });

    Form.findOne({_id: id, creatorId: req.session.user_id, isDeleted: false}, (err, form) => {
        if (err || !form)
            return res.status(404).send({
                message: "Error: form ont found",
            });

        const intent = new Intent({
            type: INTENT_TYPES.INVITE_TO_FORM,
            email,
            objectId: form._id,
            userId: req.session.user_id,
        });

        intent.save(err => {
            if (err)
                return res.status(500).send({
                    message: "Error: can't save intent",
                });

            invite_admin_email(email, form.name, req.session.user_name, intent.token)
                .then(() => res.status(200).send({}))
                .catch(e => res.status(500).send({message: "Error: can't send email"}));
        });
    });
};