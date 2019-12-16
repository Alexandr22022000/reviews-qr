const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const companySchema = mongoose.Schema({
    email: String,
    name: String,
    img: String,
    creatorId: Schema.ObjectId,
    admins: [Schema.ObjectId],
    createdAt: Date,
    isDeleted: Boolean,
});

companySchema.path('createdAt').default(() => new Date());
companySchema.path('isDeleted').default(() => false);

module.exports = mongoose.model('Company', companySchema);