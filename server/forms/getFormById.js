const Company = require('../core/models/Company'),
    Form = require('../core/models/Form');

module.exports = (id, userId, isDeleted) => {
    return new Promise((resolve, reject) => {
        Company.find({$or: [{creatorId: userId}, {admins: userId}], isDeleted: false}, (err, companies) => {
            if (err || !companies) return reject("Error: companies not found");

            let companiesFilter = companies.map(company => ({creatorId: company._id}));

            Form.findOne({_id: id, $or: [{creatorId: userId}, {admins: userId}, ...companiesFilter], isDeleted}, (err, form) => {
                if (err || !form) return reject("Error: form not found");

                resolve(form, companies);
            });
        });
    });
};