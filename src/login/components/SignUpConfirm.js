import React from "react";
import { Redirect } from "react-router-dom";
import query from "query-string";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import signupConfirm from "../async_actions/signupConfirm";

class Login extends React.Component {
    render() {
        if (this.props.user_name) return <Redirect to="/" />;

        return (
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Finishing of registration...</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please wait, we are checking your email...</DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    componentWillMount() {
        this.props.signupConfirm(query.parse(window.location.search).token);
    }
}

const mapStateToProps = (state) => ({
    user_name: state.user.name,
});

const mapDispatchToProps = {
    signupConfirm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
