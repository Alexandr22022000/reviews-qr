const login = require('../login/api/login'),
    google_login = require('../login/api/google_login'),
    signup = require('../login/api/signup'),
    logout = require('../login/api/logout'),
    signup_confirm = require('../login/api/signup_confirm'),
    is_authenticated = require('../login/api/is_authenticated'),
    users_get = require('../users/api/get');

module.exports = (app) => {
    app.post('/api/login', login);
    app.post('/api/google_login', google_login);
    app.post('/api/logout', logout);
    app.post('/api/signup', signup);
    app.post('/api/signup_confirm', signup_confirm);

    app.post('/api/users/get', is_authenticated, users_get);
};