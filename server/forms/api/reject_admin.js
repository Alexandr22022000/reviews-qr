const Form = require('../../core/models/Form'),
    User = require('../../core/models/User'),
    reject_admin_email = require('../emails/reject_admin');

module.exports = (req, res) => {
    const {id, admin_id} = req.body;

    if (!id || !id.trim() || !admin_id || !admin_id.trim())
        return res.status(400).send({
            message: "Error: id or admin_id can't be empty",
        });

    Form.findOne({_id: id, creatorId: req.session.user_id, isDeleted: false}, (err, form) => {
        if (err || !form)
            return res.status(404).send({
                message: "Error: form ont found",
            });

        form.admins = form.admins.filter(admin => admin +'' !== admin_id +'');
        form.save(err => {
            if (err)
                return res.status(500).send({
                    message: "Error: can't save form",
                });

            User.findOne({id: admin_id}, (err, user) => {
                if (err || !user) return;
                reject_admin_email(user.email, form.name, req.session.user_name);
            });

            res.status(200).send({});
        });
    });
};