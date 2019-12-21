const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

const codeSchema = mongoose.Schema({
    formId: Schema.ObjectId,
    link: String,
    name: String,
    description: String,
    img: String,
    type: String,
    style: {
        colorBackground: String,
        colorBackground2: String,
        colorText: String,
        color1: String,
        color2: String,
        textFont: String,
    },
    createdAt: Date,
    isDeleted: Boolean,
});

codeSchema.path('createdAt').default(() => new Date());
codeSchema.path('isDeleted').default(() => false);
codeSchema.path('link').default(() => crypto.randomBytes(8).toString('hex'));

module.exports = mongoose.model('Code', codeSchema);