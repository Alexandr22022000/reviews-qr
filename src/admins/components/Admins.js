import React from "react";
import Preloader from "../../core/components/Preloader";
import { connect } from "react-redux";
import invite from "../api/inviteAdminToCompany";
import reject from "../api/rejectCompanyAdmin";
import setAdminsProcessing from "../redux/viewAdminsSlice";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Skeleton from "@material-ui/lab/Skeleton";

class Admins extends React.Component {
    //FIXME add invitations display, add emails display and check (already exist), update on every open
    render() {
        if (this.props.processingStatus === 1) return <Preloader />;

        if (this.props.processingStatus === -1)
            return (
                <Dialog
                    open={true}
                    onClose={() => this.props.setAdminsProcessing({ processingStatus: 0 })}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle>{`Invitation sent to ${this.state.email}`}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.props.setAdminsProcessing({ processingStatus: 0 })}>Ok</Button>
                    </DialogActions>
                </Dialog>
            );

        if (this.state.idForRejection)
            return (
                <Dialog
                    open={true}
                    onClose={() => this.setState({ idForRejection: null })}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{`Are you sure you want to reject admin ${this.state.nameForRejection}`}</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.setState({ idForRejection: null })}>Cancel</Button>
                        <Button onClick={this.reject.bind(this)} color="secondary" variant="contained">
                            Reject
                        </Button>
                    </DialogActions>
                </Dialog>
            );

        let admins;
        if (this.props.object) {
            console.log("sadasdsadsssssssssssssssssss", this.props.object);
            admins =
                this.props.object.admins.sort((a, b) => (a.isCreator ? -1 : 1)) &&
                this.props.object.admins.sort((a, b) => (a.isCreator ? -1 : 1));
            admins = admins.map((admin) => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={admin.name} secondary={admin.isCreator ? "Owner" : "Admin"} />

                    <ListItemSecondaryAction>
                        {admin.isCreator ? (
                            ""
                        ) : (
                            <IconButton
                                onClick={() =>
                                    this.setState({ idForRejection: admin.id, nameForRejection: admin.name })
                                }
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        )}
                    </ListItemSecondaryAction>
                </ListItem>
            ));
        } else {
            admins = [0, 1].map((i) => (
                <ListItem>
                    <ListItemAvatar>
                        <Skeleton variant="circle" width={40} height={40} />
                    </ListItemAvatar>
                    <Skeleton variant="text" width={150} />
                </ListItem>
            ));
        }

        return (
            <Dialog open={this.props.open} onClose={this.onClose.bind(this)} aria-labelledby="form-dialog-title">
                <DialogTitle>Admins</DialogTitle>
                <DialogContent>
                    <List>{admins}</List>

                    {!this.state.openInviteButton ? (
                        <Button
                            fullWidth
                            onClick={() => this.setState({ openInviteButton: true })}
                            color="primary"
                            variant="contained"
                        >
                            Invite Admin
                        </Button>
                    ) : (
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Email"
                                type="email"
                                style={{ marginTop: 0, width: "70%" }}
                                error={this.state.errorEmail}
                                helperText={this.state.errorEmail}
                                onChange={(e) => this.updateInput(e.target.value)}
                                value={this.state.email}
                            />
                            <Button
                                style={{ marginTop: "10px", width: "30%" }}
                                onClick={this.invite.bind(this)}
                                color="primary"
                                variant="contained"
                            >
                                Send
                            </Button>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onClose.bind(this)}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentWillMount() {
        this.setState({
            email: "",
            errorEmail: "",
            openInviteButton: false,
            idForRejection: null,
            nameForRejection: "",
        });
    }

    onClose() {
        this.setState({
            email: "",
            errorEmail: "",
            openInviteButton: false,
            idForRejection: null,
        });
        this.props.onClose();
    }

    updateInput(v) {
        this.setState({
            email: v,
            errorEmail: /\S+@\S+\.\S+/.test(v) ? "" : "Invalid email",
        });
    }

    invite() {
        if (!/\S+@\S+\.\S+/.test(this.state.email)) return this.setState({ errorEmail: "Invalid email" });

        this.props.invite(this.state.email);
        this.setState({ openInviteButton: null });
    }

    reject() {
        this.props.reject(this.state.idForRejection);
        this.setState({ idForRejection: false });
    }
}

const mapStateToProps = (state) => ({
    object: state.companies.activeCompany,
    processingStatus: state.admins.processingStatus,
});

const mapDispatchToProps = {
    invite,
    reject,
    setAdminsProcessing,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
