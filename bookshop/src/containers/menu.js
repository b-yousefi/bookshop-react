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
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CategoryList from './categoryList';
import LoginForm from './form_login';

import { logoutUser } from '../actions/actions_user';


class Menu extends Component {

    onLogout = () => {
        this.props.logoutUser();
    }

    create_tlb_home(classes) {
        return (
            <Button color="inherit"
                className={classes.button}
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
                <LoginForm />
        )
    }

    create_tlb_authors(classes) {
        return (
            <Button color="inherit"
                className={classes.button}
                component={NavLink} to="/authors">
                Authors
            </Button>
        )
    }

    create_toolbar() {
        const { classes } = this.props;

        return (
            <Toolbar>
                {this.create_tlb_home(classes)}
                <CategoryList classes={classes} />
                {this.create_tlb_authors(classes)}
                <div className={classes.grow} />
                {this.create_tlb_user()}
                {this.create_tlb_loginout()}
            </Toolbar>
        )
    }

    render() {
        return (
            <AppBar position="sticky" >
                {this.create_toolbar()}
            </AppBar>
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