import React from 'react';
import Recaptcha from 'react-grecaptcha';
import CheckYourEmail from './CheckYourEmail';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

class SignUp extends React.Component {
    render () {
        if (this.props.checkEmail)
            return <CheckYourEmail/>;

        return (
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
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
                        onChange={e => this.updateInput(e.target.value, 'email')}
                        value={this.state.email}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        error={this.props.errors.name}
                        helperText={this.props.errors.name}
                        onChange={e => this.updateInput(e.target.value, 'name')}
                        value={this.state.name}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        error={this.props.errors.password}
                        helperText={this.props.errors.password}
                        onChange={e => this.updateInput(e.target.value, 'password')}
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
                        onChange={e => this.updateInput(e.target.value, 'confirm_password')}
                        value={this.state.confirm_password}
                    />
                    <Recaptcha
                        className="login__captcha"
                        sitekey={'6LcGKFYUAAAAAGjqkgsoWX9IJaX4o-f8bvk04kpu'}
                        callback={this.onChangeCaptcha.bind(this)}
                    />
                    <h6 style={{color: 'red'}}>{this.props.errors.recaptcha}</h6>
                </DialogContent>
                <DialogActions>
                    <Link to="/login" style={{'text-decoration': 'none'}}>
                        <Button>
                            Login
                        </Button>
                    </Link>
                    <Button onClick={this.signup.bind(this)} color="primary" variant="contained">
                        SignUp
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount () {
        this.props.addError("signup", null, null);
        this.setState({
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            recaptcha: '',
        });
    }

    onChangeCaptcha (hash) {
        this.setState({recaptcha: hash});
        this.props.addError("signup", "recaptcha", null);
    }

    updateInput (value, key) {
        switch (key) {
            case 'confirm_password':
                this.validator.confirm_password(value);
                break;

            case 'email':
                this.validator.email(value);
                break;

            case 'name':
                this.validator.name(value);
                break;

            case 'password':
                this.validator.password(value);
                break;
        }

        this.setState({[key]: value});
    }

    signup () {
        let isOk = true;
        isOk = this.validator.email(this.state.email) && isOk;
        isOk = this.validator.password(this.state.password) && isOk;
        isOk = this.validator.confirm_password(this.state.confirm_password) && isOk;
        isOk = this.validator.name(this.state.name) && isOk;
        isOk = this.validator.recaptcha(this.state.recaptcha) && isOk;

        if (isOk) this.props.signup(this.state.email, this.state.password, this.state.name, this.state.recaptcha);
    }

    validator = {
        confirm_password: value => {
            let isOk = value === this.state.password;
            this.props.addError("signup", "confirm_password", isOk ? null : "Passwords is not equal");
            return isOk;
        },
        email: value => {
            let isOk = /\S+@\S+\.\S+/.test(value);
            this.props.addError("signup", "email", isOk ? null : "Invalid email");
            return isOk;
        },
        name: value => {
            let isOk = !!value.trim();
            this.props.addError("signup", "name", isOk ? null : "Name can't be empty");
            return isOk;
        },
        password: value => {
            let isOk = value.length > 6;
            this.props.addError("signup", "password", isOk ? null : "Password should be more 6 symbols");
            return isOk;
        },
        recaptcha: value => {
            let isOk = value;
            this.props.addError("signup", "recaptcha", isOk ? null : "Proof that you are not robot");
            return isOk;
        }
    }
}

export default SignUp;