module.exports = (req, res, next) => {
    if (req.session.user_id) return next();
    res.status(401).send({});
};