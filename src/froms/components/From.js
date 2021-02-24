import React from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import getForm from '../api/getForm'
import getForms from '../api/getForms'
import query from "query-string";
import {setActiveForm, setActiveFormId,setForms} from "../redux/viewFormsSlice";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";



class Form extends React.Component {

    render() {

        return (
            <div className={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to={'?company='  + query.parse(document.location.search).company} style={{color: 'white'}}>
                            <ArrowBackIcon  edge="start"  aria-label="menu" >
                                <MenuIcon />
                            </ArrowBackIcon>
                        </Link>
                    </Toolbar>
                    <Typography style={{ marginLeft: "10px" }} variant="h6">
                        {this.getFromName()}
                    </Typography>
                </AppBar>
            </div>
        )
    }

    getFromName() {
        return this.props.form ? this.props.form.name : "0"
    }
    componentWillMount() {
        this.setState({
            name: this.props.getForm(query.parse(window.location.search).id)
        })
    }
}

const mapStateToProps = (state) => ({
    formId: state.forms.activeFormId,
    form: state.forms.activeForm,
    forms: state.forms.forms,
    company: state.companies.activeCompany,
    companyId: state.companies.activeCompanyId,
    //* name: state.forms.activeForm || state.forms.activeForm.name
});

const mapDispatchToProps = {
    setActiveFormId,
    setActiveForm,
    getForm,
    getForms,
    setForms
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);



















