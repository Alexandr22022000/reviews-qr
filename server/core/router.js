const login = require('../login/api/login'),
    google_login = require('../login/api/google_login'),
    signup = require('../login/api/signup'),
    logout = require('../login/api/logout'),
    signup_confirm = require('../login/api/signup_confirm'),
    restore_password = require('../login/api/restore_password'),
    restore_password_request = require('../login/api/restore_password_request'),
    is_authenticated = require('../login/api/is_authenticated'),
    users_get = require('../users/api/get');

module.exports = (app) => {
    app.post('/api/login', login);
    app.post('/api/google_login', google_login);
    app.post('/api/logout', logout);
    app.post('/api/signup', signup);
    app.post('/api/signup_confirm', signup_confirm);
    app.post('/api/restore_password', restore_password);
    app.post('/api/restore_password_request', restore_password_request);

    app.post('/api/users/get', is_authenticated, users_get);
};