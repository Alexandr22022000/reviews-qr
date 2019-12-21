const INTENT_TYPES = require('../../core/constants/intent_types'),
    Intent = require('../../core/models/Intent'),
    copyForm = require('../copy');

module.exports = (req, res) => {
    const {token} = req.body;

    if (!token || !token.trim())
        return res.status(400).send({
            message: "Error: token can't be empty",
        });

    Intent.findOne({token, email: req.session.user_email, type: INTENT_TYPES.SHARE_FORM}, (err, intent) => {
        if (err || !intent)
            return res.status(200).send({
                message: "Your email token is outdated! Please get new email token",
            });

        copyForm(intent.objectId, req.session.user_id)
            .then(id => {
                intent.remove();
                res.status(200).send({id});
            })
            .catch(e => res.status(500).send({message: e}));
    });
};