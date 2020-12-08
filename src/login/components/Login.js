import React from "react";
import { Link, Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import login from "../async_actions/login";
import googleLogin from "../async_actions/googleLogin";
import addError from "../actions/addError";

class Login extends React.Component {
    render() {
        if (this.props.user_name) return <Redirect to="/" />;

        return (
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        error={this.props.errors.email}
                        helperText={this.props.errors.email}
                        onChange={(e) => this.updateInput(e.target.value, "email")}
                        value={this.state.email}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        error={this.props.errors.password}
                        helperText={this.props.errors.password}
                        onChange={(e) => this.updateInput(e.target.value, "password")}
                        value={this.state.password}
                    />
                    <h4>Or</h4>
                    <GoogleLogin
                        clientId="881909564162-hiui40gb1qbk8qb23ru3l1p93691ir4h.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.responseGoogle.bind(this)}
                        onFailure={this.responseGoogle.bind(this)}
                        cookiePolicy={"single_host_origin"}
                    />
                    <h5 style={{ color: "red" }}>{this.props.errors.google_login}</h5>
                </DialogContent>
                <DialogActions>
                    <Link to="/restore_password_request" style={{ "text-decoration": "none" }}>
                        <Button>Forget password</Button>
                    </Link>
                    <Link to="/signup" style={{ "text-decoration": "none" }}>
                        <Button>SignUp</Button>
                    </Link>
                    <Button onClick={this.login.bind(this)} color="primary" variant="contained">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount() {
        this.props.addError("login", null, null);
        this.setState({
            email: "",
            password: "",
        });
    }

    updateInput(value, key) {
        switch (key) {
            case "email":
                this.validator.email(value);
                break;

            case "password":
                this.validator.password(value);
                break;
        }

        this.setState({ [key]: value });
    }

    login() {
        let isOk = true;
        isOk = this.validator.email(this.state.email) && isOk;
        isOk = this.validator.password(this.state.password) && isOk;

        if (isOk) this.props.login(this.state.email, this.state.password);
    }

    responseGoogle(response) {
        if (!response || !response.w3 || !response.tokenObj) return;
        this.props.googleLogin(response.w3.U3, response.w3.ig, response.w3.Paa, response.tokenObj.login_hint);
    }

    validator = {
        email: (value) => {
            let isOk = /\S+@\S+\.\S+/.test(value);
            this.props.addError("login", "email", isOk ? null : "Invalid email");
            return isOk;
        },
        password: (value) => {
            let isOk = value.length > 0;
            this.props.addError("login", "password", isOk ? null : "Password can't be empty");
            return isOk;
        },
    };
}

const mapStateToProps = (state) => ({
    user_name: state.user.name,
    errors: state.login.login_errors,
});

const mapDispatchToProps = {
    login,
    addError,
    googleLogin,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
