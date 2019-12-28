const Intent = require('../../core/models/Intent'),
    INTENT_TYPES = require('../../core/constants/intent_types'),
    share_email = require('../emails/share'),
    copyForm = require('../copy'),
    getFormById = require('../getFormById');

module.exports = (req, res) => {
    const {id, email} = req.body;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    getFormById(id, req.session.user_id)
        .then(({form}) => {
            if (!email) {
                return copyForm(id, req.session.user_id, "_copy")
                    .then(id => res.status(200).send({id}))
                    .catch(e => res.status(500).send({message: e}));
            }

            const intent = new Intent({
                type: INTENT_TYPES.SHARE_FORM,
                email,
                objectId: form._id,
                userId: req.session.user_id,
            });

            intent.save(err => {
                if (err)
                    return res.status(500).send({
                        message: "Error: can't save intent",
                    });

                share_email(email, form.name, req.session.user_name, intent.token)
                    .then(() => res.status(200).send({}))
                    .catch(e => res.status(500).send({message: "Error: can't send email"}));
            });
        })
        .catch(e => {
            res.status(404).send({
                message: e,
            });
        });
};