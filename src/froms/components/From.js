import React from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import query from "query-string";

class Form extends React.Component {
    render() {
        return (
            <div className={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to={'/?company=' + query.parse(window.location.search).company}  style={{color: 'white'}}>
                            <ArrowBackIcon  edge="start"  aria-label="menu" >
                                <MenuIcon />
                            </ArrowBackIcon>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);



















