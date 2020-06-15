import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    IconButton,
    Button,
    Toolbar,
    Grid,
} from '@material-ui/core';


import { logoutUser } from '../actions/actions_user';
import { changeView } from '../actions/actions_view';
import { clearNotif } from '../actions/actions'
import CategoryList from './categoryList';
import LoginForm from './form_login';
import UserProfile from './form_user';
import TransitionAlerts from '../components/TransitionAlerts';


const VIEWS = { STORE: 'STORE', PROFILE: 'PROFILE' }

class Content extends Component {

    create_tlb_home(classes) {
        return (
            <Button
                onClick={this.changeView(VIEWS.STORE)}
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
                onClick={this.changeView(VIEWS.PROFILE)}
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

    create_content() {
        return (
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} >
                    {this.props.notification ?
                        <TransitionAlerts message={this.props.notification.message ? this.props.notification.message : 'error'} severity={this.props.notification.severity} open={this.props.error !== null}
                            onClick={() => {
                                this.props.clearNotif();
                            }}
                        /> : ''}
                </Grid>
                <Grid item md={8} >
                    {this.props.view === VIEWS.PROFILE ? <UserProfile /> : ''}
                </Grid>
            </Grid>
        )
    }

    changeView = view => (event) => {
        this.props.changeView(view);
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
                {this.create_content()}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        view: state.view,
        notification: state.notification
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser, changeView, clearNotif }, dispatch);
}

const styles = ({
    grow: {
        flexGrow: 1,
    },
}
);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));
