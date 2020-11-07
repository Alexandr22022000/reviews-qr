import React from 'react';

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

class Preloader extends React.Component { //FIXME add cool animation
    render () {
        return (
            <Dialog open={true}>
                <DialogTitle id="form-dialog-title">Processing...</DialogTitle>
            </Dialog>
        );
    }
}

export default Preloader;