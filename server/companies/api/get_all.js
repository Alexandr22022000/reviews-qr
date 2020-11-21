const CompanyModel = require("../../core/models/Company");

module.exports = (req, res) => {
    CompanyModel.find(
        { $or: [{ creatorId: req.session.user_id }, { admins: req.session.user_id }], isDeleted: false },
        (err, companies) => {
            if (err || !companies)
                return res.status(404).send({
                    message: "Error: companies not found",
                });

            companies = companies.map((Company) => ({ name: Company.name, id: Company._id, img: Company.img }));
            res.status(200).send({ companies });
        }
    );
};
