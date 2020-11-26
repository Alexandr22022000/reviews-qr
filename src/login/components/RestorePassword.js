import React from "react";
import Recaptcha from "react-grecaptcha";
import { Redirect } from "react-router-dom";
import query from "query-string";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class RestorePassword extends React.Component {
    render() {
        if (this.props.user_name) return <Redirect to="/" />;

        return (
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Restore Password</DialogTitle>
                <DialogContent>
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
                    <TextField
                        margin="dense"
                        id="confirm_password"
                        label="Confirm password"
                        type="password"
                        fullWidth
                        error={this.props.errors.confirm_password}
                        helperText={this.props.errors.confirm_password}
                        onChange={(e) => this.updateInput(e.target.value, "confirm_password")}
                        value={this.state.confirm_password}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.restore.bind(this)} color="primary" variant="contained">
                        Restore
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount() {
        this.props.addError({ form: "restore", field: null, msg: null });
        this.setState({
            password: "",
            confirm_password: "",
        });
    }

    updateInput(value, key) {
        switch (key) {
            case "confirm_password":
                this.validator.confirm_password(value);
                break;

            case "password":
                this.validator.password(value);
                break;
        }

        this.setState({ [key]: value });
    }

    restore() {
        let isOk = true;
        isOk = this.validator.password(this.state.password) && isOk;
        isOk = this.validator.confirm_password(this.state.confirm_password) && isOk;

        if (isOk) this.props.restorePassword(this.state.password, query.parse(window.location.search).token);
    }

    validator = {
        confirm_password: (value) => {
            let isOk = value === this.state.password;
            this.props.addError({
                form: "restore",
                field: "confirm_password",
                msg: isOk ? null : "Passwords is not equal",
            });
            return isOk;
        },
        password: (value) => {
            let isOk = value.length > 6;
            this.props.addError({
                form: "restore",
                field: "password",
                msg: isOk ? null : "Password should be more 6 symbols",
            });
            return isOk;
        },
    };
}

export default RestorePassword;
