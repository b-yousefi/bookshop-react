import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/actions_user'
import {
    Grid,
    TextField,
    Button,
    Paper,
    Box,
} from '@material-ui/core'

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PasswordControl from '../components/form/control_password';


class LoginForm extends Component {

    state = {
        open: false,
        placement: 'bottom-start',
        credentials: {
            username: '',
            password: ''
        },
        showPassword: false,
        errors: {
            username: undefined,
            password: undefined
        }
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;

        let errors = this.state.errors;
        errors[event.target.name] = null;

        if (cred[event.target.name] === "") {
            errors[event.target.name] = "Required";
        }
        this.setState({ credentials: cred, errors });
    }

    validate = () => {
        let errors = this.state.errors;
        if (this.state.credentials.username === "") {
            errors.username = "Required";
        }
        if (this.state.credentials.password === "") {
            errors.password = "Required";
        }
        this.setState({ errors });
        return this.state.errors.username === null && this.state.errors.password === null;
    }

    onSubmitClicked = event => {
        event.preventDefault();
        if (this.validate()) {
            this.props.loginUser(this.state.credentials);
            this.setState()
        }
        else {

        }
    }

    create_form(classes) {
        return (
            <form noValidate autoComplete="off" action="/" method="POST" onSubmit={this.onSubmitClicked} >
                <Grid container  >
                    <Grid item xs={12} container justify="center" alignItems="center">
                        <TextField
                            onChange={this.inputChanged} value={this.state.credentials.username} name="username"
                            className={clsx(classes.margin, classes.textField)}
                            label="Username"
                            placeholder="user@mail.com"
                            margin="normal"
                            error={this.state.errors && this.state.errors.username}
                            helperText={this.state.errors && this.state.errors.username}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} style={{ margin: 8 }} container justify="center" alignItems="center">
                        <PasswordControl error={this.state.errors && this.state.errors.password} name="password" required shrink={true} onChange={this.inputChanged} value={this.state.credentials.password} />
                    </Grid>
                    <Grid item xs={12} container justify="center" alignItems="center" >
                        <Button variant="contained" type="submit" className={classes.submit} color="primary">Login</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <Box display="flex" justifyContent="center">
                <Paper className={classes.root} >
                    {this.create_form(classes)}
                </Paper>
            </Box>
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