import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    IconButton,
    Button,
    Toolbar,
    Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

import PopperCategoryList from './popper_list_categories';
import PopperLoginForm from '../components/popper_form_login';
import DrawerMenuXS from './drawer_menu_xs';

import { logoutUser } from '../actions/actions_user';


class Menu extends Component {
    state = {
        drawer_open: false,
    }

    onLogout = () => {
        this.props.logoutUser();
    }

    create_tlb_home() {
        return (
            <Button color="inherit"
                component={NavLink} to="/"
                startIcon={<FontAwesomeIcon icon="book-open" />} >
                Bookshop
            </Button>
        )
    }

    create_tlb_user() {
        return (
            <IconButton
                component={NavLink} to="/user"
                aria-label={!this.props.user.isLoggedIn ? 'Sign Up' : 'Profile'}
                color="inherit"
            >
                <FontAwesomeIcon icon="user" />
            </IconButton>
        )
    }

    create_tlb_loginout() {
        return (
            this.props.user.isLoggedIn ?
                <IconButton
                    aria-label="logout"
                    onClick={this.onLogout}
                    color="inherit"
                >
                    <FontAwesomeIcon icon="sign-out-alt" />
                </IconButton>
                :
                <div>
                    <Hidden smUp>
                        <IconButton
                            aria-label="login"
                            component={NavLink} to="/login"
                            color="inherit"
                        >
                            <FontAwesomeIcon icon="sign-in-alt" />
                        </IconButton>
                    </Hidden>
                    <Hidden xsDown>
                        <PopperLoginForm />
                    </Hidden>
                </div>

        )
    }

    create_tlb_authors() {
        return (
            <Button color="inherit"
                component={NavLink} to="/authors">
                Authors
            </Button>
        )
    }

    create_tlb_publications() {
        return (
            <Button color="inherit"
                component={NavLink} to="/publications">
                Publications
            </Button>
        )
    }

    create_toolbar() {
        const { classes } = this.props;

        return (
            <Toolbar>
                <Hidden smUp>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={this.toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Hidden xsDown>
                    {this.create_tlb_home()}
                    <PopperCategoryList classes={classes} />
                    {this.create_tlb_authors()}
                    {this.create_tlb_publications()}
                </Hidden>
                <div className={classes.grow} />
                {this.create_tlb_user()}
                {this.create_tlb_loginout()}
            </Toolbar>
        )
    }

    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ drawer_open: open });
    };

    render() {
        return (
            <React.Fragment>
                <AppBar position="sticky" >
                    {this.create_toolbar()}
                </AppBar>
                <Hidden mdUp>
                    <DrawerMenuXS drawer_open={this.state.drawer_open} toggleDrawer={this.toggleDrawer} />
                </Hidden>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser }, dispatch);
}

const useStyles = theme => ({
    grow: {
        flexGrow: 1,
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Menu));