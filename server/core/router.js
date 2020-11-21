const login = require("../login/api/login"),
    google_login = require("../login/api/google_login"),
    signup = require("../login/api/signup"),
    logout = require("../login/api/logout"),
    signup_confirm = require("../login/api/signup_confirm"),
    restore_password = require("../login/api/restore_password"),
    restore_password_request = require("../login/api/restore_password_request"),
    is_authenticated = require("../login/api/is_authenticated"),
    users_restore_password_request = require("../users/api/restore_password_request"),
    users_update_password = require("../users/api/update_password"),
    users_update_email_request = require("../users/api/update_email_request"),
    users_update_email = require("../users/api/update_email"),
    users_get = require("../users/api/get"),
    companies_get_all = require("../companies/api/get_all"),
    companies_get = require("../companies/api/get"),
    companies_add = require("../companies/api/add"),
    companies_del = require("../companies/api/del"),
    companies_update = require("../companies/api/update"),
    companies_invite_admin = require("../companies/api/invite_admin"),
    companies_reject_admin = require("../companies/api/reject_admin"),
    companies_add_admin = require("../companies/api/add_admin"),
    forms_add = require("../forms/api/add"),
    forms_add_admin = require("../forms/api/add_admin"),
    forms_copy_by_company = require("../forms/api/copy_by_company"),
    forms_copy_by_user = require("../forms/api/copy_by_user"),
    forms_del = require("../forms/api/del"),
    forms_get = require("../forms/api/get"),
    forms_invite_admin = require("../forms/api/invite_admin"),
    forms_reject_admin = require("../forms/api/reject_admin"),
    forms_restore = require("../forms/api/restore"),
    forms_search = require("../forms/api/search"),
    forms_share_to_user = require("../forms/api/share_to_user"),
    forms_update = require("../forms/api/update"),
    forms_update_questions = require("../forms/api/update_questions"),
    codes_add = require("../codes/api/add"),
    codes_analytics = require("../codes/api/analytics"),
    codes_del = require("../codes/api/del"),
    codes_get = require("../codes/api/get"),
    codes_get_all = require("../codes/api/get_all"),
    codes_update = require("../codes/api/update"),
    questions_get = require("../questions/api/get"),
    questions_answer = require("../questions/api/answer");

module.exports = (app) => {
    app.get("/api/questions/get", questions_get);
    app.post("/api/questions/answer", questions_answer);

    app.post("/api/login", login);
    app.post("/api/google_login", google_login);
    app.post("/api/logout", logout);
    app.post("/api/signup", signup);
    app.post("/api/signup_confirm", signup_confirm);
    app.post("/api/restore_password", restore_password);
    app.post("/api/restore_password_request", restore_password_request);

    app.get("/api/users/get", is_authenticated, users_get);
    app.post("/api/users/restore_password_request", is_authenticated, users_restore_password_request);
    app.post("/api/users/update_password", is_authenticated, users_update_password);
    app.post("/api/users/update_email_request", is_authenticated, users_update_email_request);
    app.post("/api/users/update_email", is_authenticated, users_update_email);

    app.get("/api/companies/get_all", is_authenticated, companies_get_all);
    app.get("/api/companies/get", is_authenticated, companies_get);
    app.post("/api/companies/add", is_authenticated, companies_add);
    app.post("/api/companies/del", is_authenticated, companies_del);
    app.post("/api/companies/update", is_authenticated, companies_update);
    app.post("/api/companies/invite_admin", is_authenticated, companies_invite_admin);
    app.post("/api/companies/reject_admin", is_authenticated, companies_reject_admin);
    app.post("/api/companies/add_admin", is_authenticated, companies_add_admin);

    app.get("/api/forms/search", is_authenticated, forms_search);
    app.get("/api/forms/get", is_authenticated, forms_get);
    app.post("/api/forms/add", is_authenticated, forms_add);
    app.post("/api/forms/add_admin", is_authenticated, forms_add_admin);
    app.post("/api/forms/copy_by_company", is_authenticated, forms_copy_by_company);
    app.post("/api/forms/copy_by_user", is_authenticated, forms_copy_by_user);
    app.post("/api/forms/invite_admin", is_authenticated, forms_invite_admin);
    app.post("/api/forms/reject_admin", is_authenticated, forms_reject_admin);
    app.post("/api/forms/restore", is_authenticated, forms_restore);
    app.post("/api/forms/del", is_authenticated, forms_del);
    app.post("/api/forms/share_to_user", is_authenticated, forms_share_to_user);
    app.post("/api/forms/update", is_authenticated, forms_update);
    app.post("/api/forms/update_questions", is_authenticated, forms_update_questions);

    app.get("/api/codes/get", is_authenticated, codes_get);
    app.get("/api/codes/get_all", is_authenticated, codes_get_all);
    app.get("/api/codes/analytics", is_authenticated, codes_analytics);
    app.post("/api/codes/add", is_authenticated, codes_add);
    app.post("/api/codes/del", is_authenticated, codes_del);
    app.post("/api/codes/update", is_authenticated, codes_update);
};
