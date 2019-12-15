import React from 'react';
import {Redirect} from 'react-router-dom';
import query from 'query-string';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class Login extends React.Component {
    render () {
        if (this.props.user_name) return <Redirect href="/"/>;

        return (
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Finishing of registration...</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please wait, we are checking your email...
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        );
    }

    componentWillMount () {
        this.props.signupConfirm(query.parse(window.location.search).token);
    }
}

export default Login;