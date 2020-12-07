import React from "react";
import { Redirect } from "react-router-dom";
import Preloader from "../../core/components/Preloader";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import addForm from "../async-actions/addForm";
import setActiveFormId from "../actions/setActiveFormId";

class CreateForm extends React.Component {
    render() {
        if (this.props.formId) return <Redirect to={`/form?id=${this.props.formId}&company=${this.props.companyId}`} />;
        if (this.state.processing) return <Preloader />;

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create new form</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        style={{ marginBottom: "30px" }}
                        error={this.state.errorName}
                        helperText={this.state.errorName}
                        onChange={(e) => this.updateInput(e.target.value, "name")}
                        value={this.state.name}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Template</InputLabel>
                        <Select
                            value={this.state.template}
                            onChange={(e) => this.updateInput(e.target.value, "template")}
                        >
                            <MenuItem value={-1}>Empty</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button onClick={this.create.bind(this)} color="primary" variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount() {
        this.setState({
            name: "New form",
            template: -1,
            errorName: "",
            processing: false,
        });
        this.props.setActiveFormId(null);
    }

    updateInput(value, key) {
        let errorName = key === "name" && (!value || !value.trim()) ? "Name can't be empty" : "";

        this.setState({
            [key]: value,
            errorName,
        });
    }

    create() {
        const name = this.state.name;
        if (!name || !name.trim()) return this.setState({ errorName: "Name can't be empty" });

        this.setState({ processing: true });
        this.props.addForm(name);
    }
}

const mapStateToProps = (state) => ({
    formId: state.forms.activeFormId,
    companyId: state.companies.activeCompanyId,
});

const mapDispatchToProps = {
    addForm,
    setActiveFormId,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
