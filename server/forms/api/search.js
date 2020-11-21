const Company = require("../../core/models/Company"),
    Form = require("../../core/models/Form"),
    SEARCH = require("../../core/constants/search");

module.exports = (req, res) => {
    const { company_id, type } = req.query;

    if (!company_id || !company_id.trim() || !type || !type.trim())
        return res.status(400).send({
            message: "Error: company_id or type can't be empty",
        });

    prepareQueryForms(company_id, type, req.session.user_id)
        .then((query) => {
            Form.find(query, (err, forms) => {
                if (err || !forms)
                    return res.status(404).send({
                        message: "Error: forms not found",
                    });

                forms = forms.map((form) => ({
                    id: form._id,
                    name: form.name,
                    img: form.img,
                    createdAt: form.createdAt,
                }));

                res.send({ forms });
            });
        })
        .catch((e) => {
            return res.status(404).send({
                message: "Error: companies not found",
            });
        });
};

const prepareQueryForms = (company_id, type, user_id) => {
    return new Promise((resolve, reject) => {
        const queryForm = { $or: [], isDeleted: type === SEARCH.FORMS_ARCHIVE },
            queryCompany = { $or: [], isDeleted: false };

        switch (company_id) {
            case SEARCH.COMPANY_MY:
                queryForm.$or.push({ creatorId: user_id });
                break;

            case SEARCH.COMPANY_SHARED:
                queryForm.$or.push({ admins: user_id });
                queryCompany.$or.push({ admins: user_id });
                break;

            case SEARCH.COMPANY_ALL:
                queryForm.$or.push({ creatorId: user_id });
                queryForm.$or.push({ admins: user_id });
                queryCompany.$or.push({ admins: user_id });
                queryCompany.$or.push({ creatorId: user_id });
                break;

            default:
                queryCompany.$or.push({ _id: company_id });
        }

        if (queryCompany.$or.length === 0) return resolve(queryForm);

        Company.find(queryCompany, (err, companies) => {
            if (err || !companies) return reject("Company not found");

            companies.forEach((company) => queryForm.$or.push({ creatorId: company._id }));
            resolve(queryForm);
        });
    });
};
