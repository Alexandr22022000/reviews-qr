import React from 'react';
import {Redirect} from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CompanyEditor extends React.Component {
    render () {
        if (!this.props.company)
            return <Redirect to="/"/>;

        if (this.state.tryToDel) {
            const text = this.props.company.isCreator ?
                `Are you sure you want to delete company ${this.props.company.name}? This action cannot be undone.`
                :
                `Are you sure you want to leave company ${this.props.company.name}?`;

            return (
                <Dialog open={true} onClose={() => this.setState({tryToDel: false})} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{text}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.setState({tryToDel: false})}>
                            Cancel
                        </Button>
                        <Button onClick={this.delete.bind(this)} color="secondary" variant="contained">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Company settings</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        error={this.state.errorName}
                        helperText={this.state.errorName}
                        onChange={e => this.updateInput(e.target.value, 'name')}
                        value={this.state.name}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        error={this.state.errorEmail}
                        helperText={this.state.errorEmail}
                        onChange={e => this.updateInput(e.target.value, 'email')}
                        value={this.state.email}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.setState({tryToDel: true})} color="secondary">
                        Delete
                    </Button>
                    <Button onClick={this.props.onClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.update.bind(this)} color="primary" variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount () {
        this.setState({
            name: this.props.company ? this.props.company.name : "",
            email: this.props.company ? this.props.company.email : "",
            errorName: '',
            errorEmail: '',
            tryToDel: false,
        });
    }

    updateInput (value, key) {
        if (key === 'name') {
            this.setState({
                [key]: value,
                errorName: (!value || !value.trim()) ? "Name can't be empty" : "",
            });
        }
        else {
            this.setState({
                [key]: value,
                errorEmail: /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email",
            });
        }
    }

    update () {
        const name = this.state.name,
            email = this.state.email;
        let isOk = true;

        if (!name || !name.trim()) {
            this.setState({errorName: "Name can't be empty"});
            isOk = false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            this.setState({errorEmail: "Invalid email"});
            isOk = false;
        }

        if (!isOk) return;
        this.props.onClose();
        this.props.updateCompany({id: this.props.company.id, img: this.props.company.img, name, email});
    }

    delete () {
        this.props.delCompany(this.props.company.id);
        setTimeout(() => {
            this.props.onClose();
        }, 1);
    }
}

export default CompanyEditor;