const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const formSchema = mongoose.Schema({
    name: String,
    img: String,
    creatorId: Schema.ObjectId,
    admins: [Schema.ObjectId],
    questions: [
        {
            id: Number,
            type: String,
            options: [String],
            rangeStart: Number,
            rangeEnd: Number,
            title: String,
            description: String,
            isDeleted: Boolean,
        },
    ],
    style: {
        colorBackground: String,
        colorBackground2: String,
        colorText: String,
        color1: String,
        color2: String,
        textFont: String,
    },
    msg: {
        title: String,
        description: String,
        titleOut: String,
        descriptionOut: String,
    },
    createdAt: Date,
    isDeleted: Boolean,
});

formSchema.path("createdAt").default(() => new Date());
formSchema.path("isDeleted").default(() => false);

module.exports = mongoose.model("Form", formSchema);
