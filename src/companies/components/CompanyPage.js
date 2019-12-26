import React from 'react';
import query from "query-string";
import Navbar from '../../core/containers/Navbar';
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

class CompanyPage extends React.Component {
    render () {
        return (
            <div>
                <Navbar logo={<BusinessIcon style={{'margin-right': '10px'}}/>} name={"ReviewsQR"}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Navbar>
            </div>
        );
    }

    componentWillMount () {
        this.setState({});
    }
}

export default CompanyPage;