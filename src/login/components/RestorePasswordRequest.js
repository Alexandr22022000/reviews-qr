import React from "react";
import Recaptcha from "react-grecaptcha";
import CheckYourEmail from "./CheckYourEmail";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import addError from "../actions/addError";
import restorePasswordRequest from "../async_actions/restorePasswordRequest";

class RestorePasswordRequest extends React.Component {
    render() {
        if (this.props.checkEmail) return <CheckYourEmail />;

        return (
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Restore Password</DialogTitle>
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
                    <Recaptcha
                        className="login__captcha"
                        sitekey={"6LcGKFYUAAAAAGjqkgsoWX9IJaX4o-f8bvk04kpu"}
                        callback={this.onChangeCaptcha.bind(this)}
                    />
                    <h6 style={{ color: "red" }}>{this.props.errors.recaptcha}</h6>
                </DialogContent>
                <DialogActions>
                    <Link to="/login" style={{ "text-decoration": "none" }}>
                        <Button>Login</Button>
                    </Link>
                    <Button onClick={this.restore.bind(this)} color="primary" variant="contained">
                        Restore
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount() {
        this.props.addError("restore_request", null, null);
        this.setState({
            email: "",
            recaptcha: "",
        });
    }

    onChangeCaptcha(hash) {
        this.setState({ recaptcha: hash });
        this.props.addError("restore_request", "recaptcha", null);
    }

    updateInput(value, key) {
        this.validator.email(value);

        this.setState({ [key]: value });
    }

    restore() {
        let isOk = true;
        isOk = this.validator.email(this.state.email) && isOk;
        isOk = this.validator.recaptcha(this.state.recaptcha) && isOk;

        if (isOk) this.props.restorePasswordRequest(this.state.email, this.state.recaptcha);
    }

    validator = {
        email: (value) => {
            let isOk = /\S+@\S+\.\S+/.test(value);
            this.props.addError("restore_request", "email", isOk ? null : "Invalid email");
            return isOk;
        },
        recaptcha: (value) => {
            let isOk = value;
            this.props.addError("restore_request", "recaptcha", isOk ? null : "Proof that you are not robot");
            return isOk;
        },
    };
}

const mapStateToProps = (state) => ({
    checkEmail: state.login.checkEmail,
    errors: state.login.restore_request_errors,
});

const mapDispatchToProps = {
    addError,
    restorePasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestorePasswordRequest);