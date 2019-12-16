const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

const IntentSchema = Schema({
    type: String,
    email: String,
    token: String,
    objectId: Schema.ObjectId,
    targetId: Schema.ObjectId,
    data: Schema.Types.Mixed,
    createdAt: Date,
    userId: Schema.ObjectId,
});

IntentSchema.path('createdAt').default(() => new Date());

IntentSchema.path('token').default(() => crypto.randomBytes(64).toString('hex'));

module.exports = mongoose.model('Intent', IntentSchema);