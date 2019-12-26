module.exports = (req, res) => {
    req.session.destroy();
    res.status(401).send({});
};