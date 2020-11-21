const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const answerSchema = mongoose.Schema({
    codeId: Schema.ObjectId,
    customerId: String,
    customerIp: String,
    customerLocation: String,
    answers: [
        {
            id: Number,
            value: String,
        },
    ],
    createdAt: Date,
});

answerSchema.path("createdAt").default(() => new Date());

module.exports = mongoose.model("Answer", answerSchema);
