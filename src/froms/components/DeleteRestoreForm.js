import React from "react";
import { connect } from "react-redux";
import delForm from "../api/delForm";
import restoreForm from "../api/restoreForm";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class DeleteRestoreForm extends React.Component {
    render() {
        const text = this.props.isRestore
            ? `Are you sure you want to restore form ${this.props.formName}?`
            : `Are you sure you want to delete form ${this.props.formName}?`;

        return (
            <Dialog open={this.props.formId} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{text}</DialogTitle>
                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button
                        onClick={this.delete.bind(this)}
                        color={this.props.isRestore ? "primary" : "secondary"}
                        variant="contained"
                    >
                        {this.props.isRestore ? "Restore" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    delete() {
        this.props.onClose();
        if (this.props.isRestore) this.props.restoreForm(this.props.formId);
        else this.props.delForm(this.props.formId);
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    delForm,
    restoreForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRestoreForm);
