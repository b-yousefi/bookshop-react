import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/actions_user'
import {
    Grid,
    TextField,
    Button,
} from '@material-ui/core'

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PopperBtn from './popper_button';
import PasswordField from './field_password'


class LoginForm extends Component {

    state = {
        open: false,
        placement: 'bottom-start',
        credentials: {
            username: '',
            password: ''
        },
        showPassword: false
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.id] = event.target.value;
        this.setState({ credentials: cred });
    }

    onSubmitClicked = event => {
        event.preventDefault();
        console.log("Submit Clicked");

        this.props.loginUser(this.state.credentials);
    }

    create_form() {
        const { classes } = this.props;
        return (
            <form noValidate autoComplete="off" action="/" method="POST" onSubmit={this.onSubmitClicked} className={classes.root}>
                <Grid container  >
                    <Grid item xs={12} container justify="center" alignItems="center">
                        <TextField
                            onChange={this.inputChanged} value={this.state.credentials.username} id="username"
                            className={clsx(classes.margin, classes.textField)}
                            label="Username"
                            placeholder="user@mail.com"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} container justify="center" alignItems="center">
                        <PasswordField onChange={this.inputChanged} value={this.state.credentials.password} />
                    </Grid>
                    <Grid item xs={12} container justify="center" alignItems="center" >
                        <Button variant="contained" type="submit" className={classes.submit} color="primary">Login</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    render() {
        return (
            <PopperBtn btnName="Login" placement='bottom-end' icon="sign-in-alt">
                {this.create_form()}
            </PopperBtn>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser }, dispatch);
}

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '30ch',
        padding: '1ch'
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
});

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(LoginForm));