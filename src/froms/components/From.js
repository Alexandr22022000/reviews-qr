import React from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import getForm from '../api/getForm'
import getForms from '../api/getForms'
import query from "query-string";
import {setActiveForm, setActiveFormId,setForms} from "../redux/viewFormsSlice";
import logout from "../../login/api/logout";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Form extends React.Component {
    render() {
        return (
            <div className={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to={'/'} style={{color: 'white'}}>
                            <ArrowBackIcon  edge="start"  aria-label="menu" >
                                <MenuIcon />
                            </ArrowBackIcon>
                        </Link>
                        <Typography style={{ marginLeft: "10px" }} variant="h6">
                            <AssignmentIcon style={{ marginRight: "10px", marginTop:'10px', fontSize:"25px" }} variant="h6"/>
                        </Typography>
                        <Typography variant="h6">  {this.props.form ? this.props.form.name : ""} </Typography>
                        <Typography variant="h6" style={{ flexGrow: "1" }} />
                        {this.props.children}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => this.setState({ showAccountMenu: true })}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={"primary-search-account-menu"}
                            anchorOrigin={{  vertical: 'top', horizontal: 'right', }}
                            id={1}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            anchorPosition={{left:20000, top:40}}
                            anchorReference={'anchorPosition'}
                            open={this.state.showAccountMenu}
                            onClose={() => this.setState({ showAccountMenu: false })}
                        >
                            <MenuItem component={Link} to={"/profile"}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={this.props.logout.bind(this)}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    componentWillMount() {
        this.props.getForm(query.parse(window.location.search).id)
        this.setState({
            showAccountMenu: false,
        });
    }
}

const mapStateToProps = (state) => ({
    formId: state.forms.activeFormId,
    form: state.forms.activeForm,
    forms: state.forms.forms,
    company: state.companies.activeCompany,
    companyId: state.companies.activeCompanyId,
});

const mapDispatchToProps = {
    setActiveFormId,
    setActiveForm,
    getForm,
    getForms,
    setForms,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);



















