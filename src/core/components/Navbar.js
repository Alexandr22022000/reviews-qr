import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import getCompanies from "../../companies/async-actions/getCompanies";

class Navbar extends React.Component {
    render () {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{flexGrow: '1'}}>
                            Пиццбург заказы
                        </Typography>
                        <Button color="inherit" onClick={this.logout}>Выйти</Button>
                    </Toolbar>
                </AppBar>

                {this.props.children}
            </div>
        );
    }

    componentWillMount () {
        this.props.getCompanies();
    }
}

export default Navbar;