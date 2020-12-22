import React from "react";
import SEARCH from "../constants/search";
import query from "query-string";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import getCompanies from "../../companies/api/getCompanies";
import logout from "../../login/api/logout";
import addCompany from "../../companies/api/addCompany";
import { setAddButtonStatus, setActiveCompanyId } from "../../companies/redux/viewCompaniesSlice";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import BusinessIcon from "@material-ui/icons/Business";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"; //FIXME add ReviewsQR logo and add Avatar component
import ShareIcon from "@material-ui/icons/Share";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Skeleton from "@material-ui/lab/Skeleton";

class Navbar extends React.Component {
    render() {
        let companies = [];
        if (this.props.companies) {
            companies.push({ name: "All", img: "logo", id: SEARCH.COMPANY_ALL });
            companies.push({ name: "Personal", img: "user", id: SEARCH.COMPANY_MY });
            companies.push({ name: "Shared", img: "share", id: SEARCH.COMPANY_SHARED });
            companies = companies.concat(this.props.companies);

            companies = companies.map((company) => (
                <ListItem
                    style={company.id === this.props.activeCompanyId ? { backgroundColor: "#b3b3b3" } : {}}
                    component={Link}
                    to={"/?company=" + company.id}
                    onClick={() => this.onChangeCompany(company.id)}
                    button
                    key={company.id}
                >
                    <ListItemIcon>{this.getCompanyIcon(company.img)}</ListItemIcon>
                    <ListItemText primary={company.name} />
                </ListItem>
            ));
        } else {
            companies = [0, 1, 2].map(() => (
                <ListItem button key={"new"}>
                    <ListItemIcon>
                        <Skeleton variant="circle" width={30} height={30} />
                    </ListItemIcon>
                    <ListItemText>
                        <Skeleton variant="text" fullWidth />
                    </ListItemText>
                </ListItem>
            ));
        }

        return (
            <div>
                <AppBar position="static" onClick={() => this.props.setAddButtonStatus({ status: 0 })}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => this.setState({ showDrawer: true })}
                        >
                            <MenuIcon />
                        </IconButton>
                        {this.props.logo}
                        <Typography style={{ marginLeft: "10px" }} variant="h6">
                            {this.props.name}
                        </Typography>
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
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            id={1}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
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

                <SwipeableDrawer
                    open={this.state.showDrawer}
                    onClose={() => this.setState({ showDrawer: false })}
                    onOpen={() => this.setState({ showDrawer: true })}
                >
                    <div>
                        <ListItem button key={"close"} onClick={() => this.setState({ showDrawer: false })}>
                            <ListItemIcon>
                                <ChatBubbleIcon />
                            </ListItemIcon>
                            <ListItemText primary={"ReviewsQR"} />
                            <ChevronLeftIcon />
                        </ListItem>
                    </div>
                    <Divider />
                    <List>
                        {companies}
                        {this.renderAddButton()}
                    </List>
                </SwipeableDrawer>
            </div>
        );
    }

    componentWillMount() {
        this.props.getCompanies();
        let activeCompanyId = query.parse(window.location.search).company;
        if (window.location.pathname === "/" && !activeCompanyId) activeCompanyId = SEARCH.COMPANY_ALL;
        this.props.setActiveCompanyId({ id: activeCompanyId });
        if (this.props.onChangeCompany) this.props.onChangeCompany(activeCompanyId);

        this.setState({
            showAccountMenu: false,
            showDrawer: false,
            newCompanyName: "New company",
            addCompanyError: "",
        });
    }

    getCompanyIcon(img) {
        switch (img) {
            case "logo":
                return <ChatBubbleIcon />;

            case "user":
                return <AccountCircle />;

            case "share":
                return <ShareIcon />;

            default:
                return <BusinessIcon />;
        }
    }

    renderAddButton() {
        switch (this.props.addButtonStatus) {
            case 0:
                return (
                    <ListItem button key={"new"} onClick={() => this.props.setAddButtonStatus({ status: 1 })}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Create new"} />
                    </ListItem>
                );

            case 1:
                return (
                    <ListItem key={"new"} style={{ display: "inline-block" }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New company name"
                            type="email"
                            fullWidth
                            value={this.state.newCompanyName}
                            onChange={(e) => this.setState({ newCompanyName: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && this.addNewCompany()}
                            error={this.state.addCompanyError}
                            helperText={this.state.addCompanyError}
                        />

                        <div style={{ "text-align": "right" }}>
                            <Button
                                style={{ "margin-right": "8px" }}
                                onClick={() => {
                                    this.props.setAddButtonStatus({ status: 0 });
                                }}
                            >
                                {" "}
                                Cancel
                            </Button>

                            <Button variant="contained" color="primary" onClick={this.addNewCompany}>
                                Create
                            </Button>
                        </div>
                    </ListItem>
                );

            case -1:
                return (
                    <ListItem button key={"new"}>
                        <ListItemIcon>
                            <Skeleton variant="circle" width={30} height={30} />
                        </ListItemIcon>
                        <ListItemText>
                            <Skeleton variant="text" fullWidth />
                        </ListItemText>
                    </ListItem>
                );
        }
    }

    addNewCompany = (e) => {
        let name = this.state.newCompanyName;
        if (!name || !name.trim()) return this.setState({ addCompanyError: "Name can't be empty" });

        this.props.addCompany(name);
        this.setState({ newCompanyName: "New company", addCompanyError: "" });
    };

    onChangeCompany(id) {
        this.props.setActiveCompanyId({ id });
        if (this.props.onChangeCompany) this.props.onChangeCompany(id);
        return this.props.setAddButtonStatus({ status: 0 });
    }
}

const mapStateToProps = (state) => ({
    request_error: state.statuses.request_error,
    companies: state.companies.companies,
    activeCompanyId: state.companies.activeCompanyId,
    addButtonStatus: state.companies.addButtonStatus,
});

const mapDispatchToProps = {
    getCompanies,
    addCompany,
    setAddButtonStatus,
    logout,
    setActiveCompanyId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
