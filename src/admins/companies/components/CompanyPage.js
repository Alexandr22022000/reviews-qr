import React from "react";
import Navbar from "../../core/components/Navbar";
import { Link } from "react-router-dom";
import SEARCH from "../../core/constants/search";
import CreateForm from "../../froms/components/CreateForm";
import DeleteRestoreForm from "../../froms/components/DeleteRestoreForm";
import CompanyEditor from "../components/CompanyEditor";

import CompanyAdmins from "../../components/Admins";

import BusinessIcon from "@material-ui/icons/Business";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import SettingsIcon from "@material-ui/icons/Settings";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fab from "@material-ui/core/Fab";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import Skeleton from "@material-ui/lab/Skeleton";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShareIcon from "@material-ui/icons/Share";

class CompanyPage extends React.Component {
    render() {
        const isCompany =
            this.props.companyId !== SEARCH.COMPANY_SHARED &&
            this.props.companyId !== SEARCH.COMPANY_MY &&
            this.props.companyId !== SEARCH.COMPANY_ALL;

        let forms = this.props.forms;
        if (forms) {
            forms = forms.map((form) => {
                let itemProps, menuItems;
                if (this.props.searchType === SEARCH.FORMS_ARCHIVE) {
                    itemProps = {
                        onClick: () =>
                            this.setState({
                                deleteFormId: form.id,
                                deleteFormName: form.name,
                                isRestore: true,
                                formMenuId: null,
                            }),
                    };

                    menuItems = [<MenuItem {...itemProps}>Restore</MenuItem>];
                } else {
                    itemProps = {
                        component: Link,
                        to: `/form?id=${form.id}&company=${this.props.companyId}`,
                        style: { "text-decoration": "none" },
                    };

                    menuItems = [
                        <MenuItem component={Link} to={`/form?id=${form.id}&company=${this.props.companyId}`}>
                            Open form
                        </MenuItem>,
                        <MenuItem component={Link} to={`/form/statistic?id=${form.id}&company=${this.props.companyId}`}>
                            Open statistic
                        </MenuItem>,
                        <MenuItem component={Link} to={`/form/codes?id=${form.id}&company=${this.props.companyId}`}>
                            Open qr-code
                        </MenuItem>,
                        <MenuItem
                            onClick={() =>
                                this.setState({
                                    deleteFormId: form.id,
                                    deleteFormName: form.name,
                                    isRestore: false,
                                    formMenuId: null,
                                })
                            }
                        >
                            Delete
                        </MenuItem>,
                    ];
                }

                return (
                    <TableRow key={form.id} style={{ cursor: "pointer" }} hover>
                        <TableCell padding="checkbox" {...itemProps}>
                            <ListItemIcon style={{ marginLeft: "20px", marginRight: "-20px" }}>
                                <AssignmentIcon />
                            </ListItemIcon>
                        </TableCell>
                        <TableCell {...itemProps}>{form.name}</TableCell>
                        <TableCell align="right" {...itemProps}>
                            {form.createdAt}
                        </TableCell>
                        <TableCell align="right" {...itemProps}>
                            This company
                        </TableCell>
                        <TableCell padding="checkbox" align="right">
                            <Fab
                                style={{ border: "none", boxShadow: "none", backgroundColor: "white" }}
                                onClick={() => this.setState({ formMenuId: form.id })}
                            >
                                <MoreVertIcon />
                            </Fab>
                        </TableCell>

                        <Menu
                            anchorEl={"primary-search-account-menu"}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            id={1}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            open={this.state.formMenuId === form.id}
                            onClose={() => this.setState({ formMenuId: null })}
                        >
                            {menuItems}
                        </Menu>
                    </TableRow>
                );
            });
        } else {
            forms = [0, 1, 2, 3].map((i) => (
                <TableRow key={i}>
                    <TableCell padding="checkbox" component="th" scope="row">
                        <ListItemIcon style={{ marginLeft: "20px", marginRight: "-20px" }}>
                            <Skeleton variant="circle" width={30} height={30} />
                        </ListItemIcon>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Skeleton variant="text" fullWidth />
                    </TableCell>
                    <TableCell align="right">
                        <Skeleton variant="text" fullWidth />
                    </TableCell>
                    <TableCell align="right">
                        <Skeleton variant="text" fullWidth />
                    </TableCell>
                    <TableCell padding="checkbox" align="right" />
                </TableRow>
            ));
        }

        return (
            <div>
                <Navbar
                    onChangeCompany={this.onChangeCompany.bind(this)}
                    logo={this.getCompanyIcon()}
                    name={this.getCompanyName()}
                >
                    {isCompany ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => this.setState({ openAdmins: true })}
                            >
                                <SupervisorAccountIcon />
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => this.setState({ openEditor: true })}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </div>
                    ) : (
                        ""
                    )}
                </Navbar>

                <TableContainer component={Paper} style={{ maxHeight: "calc(100vh - 65px)" }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" />
                                <TableCell>
                                    <FormControl>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.props.searchType}
                                            onChange={(e) => this.onUpdateSearchType(e.target.value)}
                                        >
                                            <MenuItem value={SEARCH.FORMS}>Forms</MenuItem>
                                            <MenuItem value={SEARCH.FORMS_ARCHIVE}>Archive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell align="right">Created at</TableCell>
                                <TableCell align="right">Owner</TableCell>
                                <TableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>{forms}</TableBody>
                    </Table>
                </TableContainer>

                <Fab
                    style={{ position: "absolute", bottom: "40px", right: "40px", backgroundColor: "green" }}
                    onClick={() => this.setState({ openCreateForm: true })}
                >
                    <AddIcon />
                </Fab>

                {!this.state.openEditor ? (
                    ""
                ) : (
                    <CompanyEditor open={true} onClose={() => this.setState({ openEditor: false })} />
                )}

                <CreateForm open={this.state.openCreateForm} onClose={() => this.setState({ openCreateForm: false })} />
                <DeleteRestoreForm
                    formId={this.state.deleteFormId}
                    formName={this.state.deleteFormName}
                    isRestore={this.state.isRestore}
                    onClose={() => this.setState({ deleteFormId: null })}
                />

                <CompanyAdmins open={this.state.openAdmins} onClose={() => this.setState({ openAdmins: false })} />
            </div>
        );
    }

    componentWillMount() {
        this.setState({
            openCreateForm: false,
            formMenuId: null,
            deleteFormId: null,
            deleteFormName: null,
            isRestore: false,
            openEditor: false,
            openAdmins: false,
        });
    }

    onChangeCompany(id) {
        this.props.setSearchType({searchType: SEARCH.FORMS});
        this.props.getForms();

        if (id !== SEARCH.COMPANY_ALL && id !== SEARCH.COMPANY_MY && id !== SEARCH.COMPANY_SHARED)
            this.props.getCompany(id);
    }

    onUpdateSearchType(value) {
        this.props.setSearchType({searchType: value});
        this.props.getForms(value);
    }

    getCompanyIcon() {
        switch (this.props.companyId) {
            case SEARCH.COMPANY_ALL:
                return <ChatBubbleIcon />;

            case SEARCH.COMPANY_MY:
                return <AccountCircle />;

            case SEARCH.COMPANY_SHARED:
                return <ShareIcon />;

            default:
                if (!this.props.company) return <Skeleton variant="circle" width={30} height={30} />;
                return <BusinessIcon />;
        }
    }

    getCompanyName() {
        switch (this.props.companyId) {
            case SEARCH.COMPANY_ALL:
                return "ReviewsQR";

            case SEARCH.COMPANY_MY:
                return "My forms";

            case SEARCH.COMPANY_SHARED:
                return "Shared forms";

            default:
                if (!this.props.company) return <Skeleton variant="text" style={{ width: "200px" }} />;
                return this.props.company.name;
        }
    }
}

export default CompanyPage;
