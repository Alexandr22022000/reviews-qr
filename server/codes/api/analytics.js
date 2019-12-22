const Code = require('../../core/models/Code'),
    Answer = require('../../core/models/Answer'),
    getFormById = require('../../forms/getFormById'),
    SORT_TYPES = require('../../core/constants/sort_types');

module.exports = (req, res) => {
    let {id, type, date_start, date_end, show_deleted, sort_by} = req.query;

    if (!id || !id.trim())
        return res.status(400).send({
            message: "Error: id can't be empty",
        });

    Code.findOne({_id: id}, (err, code) => {
        if (err || !code)
            return res.status(404).send({
                message: "Error: code not found",
            });

        getFormById(code.formId, req.session.user_id)
            .then(form => {
                const filter = {$and: [{codeId: code._id}]};
                if (date_start) {
                    try {
                        date_start = new Date(date_start);
                        filter.$and.push({createdAt: {$gt: date_start}});
                    } catch (e) {}
                }

                if (date_end) {
                    try {
                        date_end = new Date(date_end);
                        filter.$and.push({createdAt: {$lt: date_end}});
                    } catch (e) {}
                }

                Answer.find(filter, (err, answers) => {
                    if (err || ! answers)
                        return res.status(404).send({
                            message: "Error: answers not found",
                        });

                    let users, questions;
                    switch (type) {
                        case SORT_TYPES.BY_USERS:
                            users = usersView(answers, form.questions, sort_by);
                            break;

                        case SORT_TYPES.BY_QUESTIONS:
                        default:
                            questions = questionsView(answers, form.questions, show_deleted);
                    }

                    res.status(200).send({
                        users,
                        questions,
                    });
                });
            })
            .catch(e => {
                res.status(404).send({
                    message: e,
                });
            });
    });
};

const usersView = (users, questions, sort_by) => {
    users = users.map(user => {
        const answers = user.answers.map(answer => {
            for (let key in questions) {
                if (questions[key].id === answer.id)
                    return {question: questions[key], value: answer.value};
            }
        });

        return {
            name: "customer_" + user.customerId,
            id: user.customerId,
            ip: user.customerIp,
            date: user.createdAt,
            answers,
        };
    });

    switch (sort_by) {
        case SORT_TYPES.BY_USERS:
            users = users.sort((a, b) => a.id > b.id ? -1 : (a.id === b.id ? 0 : 1));
            break;

        case SORT_TYPES.BY_DATES:
        default:
            users = users.sort((a, b) => a.date > b.date ? -1 : (a.date === b.date ? 0 : 1));
    }

    return users;
};

const questionsView = (users, questions, showDeleted) => {
    if (!showDeleted) questions = questions.filter(question => !question.isDeleted);

    questions = questions.map(question => {
        const answers = users.map(user => {
            for (let key in user.answers) {
                if (user.answers[key].id === question.id)
                    return user.answers[key].value;
            }
        });

        return {answers, question};
    });

    return questions;
};