const Form = require("../core/models/Form"),
    Code = require("../core/models/Code");

module.exports = (id, targetId, additionalName) => {
    return new Promise((resolve, reject) => {
        Form.findOne({ _id: id, isDeleted: false }, (err, formOld) => {
            if (err || !formOld) return reject("Error: form not found");

            Code.find({ formId: formOld._id, isDeleted: false }, (err, codesOld) => {
                if (err || !codesOld) return reject("Error: codes not found");

                const form = new Form({
                    name: formOld.name + (additionalName || ""),
                    img: formOld.img,
                    style: formOld.style,
                    msg: formOld.msg,
                    questions: formOld.questions.filter((question) => !question.isDeleted),
                    creatorId: targetId,
                });

                form.save((err) => {
                    if (err) return reject("Error: can't save form");

                    let i = 0;
                    codesOld.forEach((codeOld) => {
                        const code = new Code({
                            name: codeOld.name,
                            description: codeOld.description,
                            img: codeOld.img,
                            type: codeOld.type,
                            style: codeOld.style,
                            formId: form._id,
                        });

                        i++;
                        code.save((err) => {
                            if (err) return reject("Error: can't save code");

                            i--;
                            if (i === 0) resolve(form._id);
                        });
                    });
                });
            });
        });
    });
};
