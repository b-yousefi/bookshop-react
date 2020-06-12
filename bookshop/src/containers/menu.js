import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    IconButton,
    Button,
    Toolbar
} from '@material-ui/core'


import { logoutUser } from '../actions/actions_user';
import CategoryList from '../containers/categoryList';
import LoginForm from '../components/form_login';

class Menubar extends Component {

    create_tlb_home(classes) {
        return (
            <Button
                href="/"
                color="inherit"
                className={classes.button}
                startIcon={<FontAwesomeIcon icon="book-open" />}
            >
                Bookshop
            </Button>
        )
    }

    create_tlb_user() {
        return (
            <IconButton
                aria-label={!this.props.user.isLoggedIn ? 'Sign Up' : 'Profile'}
                onClick={this.handleProfileMenuOpen}
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

    create_toolbar() {
        const { classes } = this.props;

        return (
            <Toolbar>

                {this.create_tlb_home(classes)}

                <CategoryList classes={classes} />

                <div className={classes.grow} />

                {this.create_tlb_user()}

                {this.create_tlb_loginout()}

            </Toolbar>
        )
    }

    handleProfileMenuOpen = (event) => {
    }

    onLogout = () => {
        this.props.logoutUser();
    }

    render() {


        return (
            <React.Fragment>
                <AppBar position="sticky">
                    {this.create_toolbar()}
                </AppBar>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser }, dispatch);
}

const styles = ({
    grow: {
        flexGrow: 1,
    },
}
);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Menubar));
