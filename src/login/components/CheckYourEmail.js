import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const CheckYourEmail = props => (
    <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Check your email</DialogTitle>
        <DialogContent>
            <DialogContentText>We send message on your email, pleace check it.</DialogContentText>
        </DialogContent>
    </Dialog>
);

export default CheckYourEmail;
