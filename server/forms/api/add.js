const Code = require('../../core/models/Code'),
    Company = require('../../core/models/Company'),
    Form = require('../../core/models/Form'),
    IMAGES = require('../../core/constants/images'),
    CODE_TYPES = require('../../core/constants/code_types'),
    STYLE = require('../../core/constants/styles'),
    FORM_MSG = require('../../core/constants/form_msg'),
    NAMES = require('../../core/constants/names');

module.exports = (req, res) => {
    const {company_id, name} = req.body;

    if (!name || !name.trim())
        return res.status(400).send({
            message: "Error: name can't be empty",
        });

    if (!company_id) {
        return createForm(req.session.user_id, name)
            .then(id => res.status(200).send({id}))
            .catch(e => res.status(500).send({message: e}));
    }

    Company.findOne({_id: company_id, $or: [{creatorId: req.session.user_id}, {admins: req.session.user_id}], isDeleted: false}, (err, company) => {
        if (err || !company)
            return res.status(404).send({
                message: "Error: company not found",
            });

        createForm(company._id, name)
            .then(id => res.status(200).send({id}))
            .catch(e => res.status(500).send({message: e}));
    });
};

const createForm = (creatorId, name) => {
    return new Promise((resolve, reject) => {
        const form = new Form({
            name,
            creatorId: creatorId,
            img: IMAGES.FORM_DEFAULT,
            admins: [],
            questions: [],
            style: STYLE,
            msg: FORM_MSG,
        });

        form.save(err => {
            if (err) return reject("Error: can't save form");

            const code = new Code({
                formId: form._id,
                name: NAMES.CODE_DEFAULT,
                img: IMAGES.CODE_DEFAULT,
                description: "",
                type: CODE_TYPES.DEFAULT,
                style: STYLE,
            });

            code.save(err => {
                if (err) return reject("Error: can't save code");
                resolve(form._id);
            });
        });
    });
};