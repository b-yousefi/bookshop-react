import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field, Form} from 'react-final-form';
import {TextField,} from 'final-form-material-ui';
import {Button, Grid, Paper,} from '@material-ui/core';

import {fetchUser, regsiterUser, updateUser, USER_ACTIONS} from '../actions/actions_user';
import {COMMON} from '../actions/actions';
import PasswordControl from '../components/form/control_password';
import PhoneNumberControl from '../components/form/control_phone_number';

class UserForm extends Component {

    componentDidMount() {
        if (this.props.user.isLoggedIn) {
            this.props.fetchUser(this.props.user.username);
        }
    }

    validate = values => {

        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.firstName) {
            errors.firstName = 'Required';
        }
        if (!values.lastName) {
            errors.lastName = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords don't match";
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        return errors;
    };

    onSubmit = async values => {
        if (this.props.user.isLoggedIn) {
            this.props.updateUser({...values, link: this.props.user._links.self.href});
        } else {
            this.props.regsiterUser(values);
        }
    }


    render() {
        const notif = this.props.notification;
        if (notif && notif.cause === USER_ACTIONS.REGISTER && notif.severity === COMMON.SUCCESS) {
            return <Redirect to="/"/>
        }
        return (
            <div style={{padding: 16, margin: 'auto', maxWidth: 450}}>
                <Form
                    width="50px"
                    onSubmit={this.onSubmit}
                    initialValues={this.props.user ? this.props.user : {}}
                    validate={this.validate}
                    render={({handleSubmit, reset, submitting, pristine, values}) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{padding: 16}}>

                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="username"
                                            required
                                            component={TextField}
                                            type="text"
                                            label="Username"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            required
                                            name="firstName"
                                            component={TextField}
                                            type="text"
                                            label="First Name"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            required
                                            name="lastName"
                                            component={TextField}
                                            type="text"
                                            label="Last Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="email"
                                            required
                                            component={TextField}
                                            type="email"
                                            label="Email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="phoneNumber">
                                            {props => (
                                                <PhoneNumberControl
                                                    required
                                                    name={props.input.name}
                                                    value={props.input.value}
                                                    onChange={props.input.onChange}
                                                    meta={props.meta}
                                                />
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="password">
                                            {
                                                props => (
                                                    <PasswordControl
                                                        fullWidth
                                                        required
                                                        name={props.input.name}
                                                        value={props.input.value}
                                                        onChange={props.input.onChange}
                                                        meta={props.meta}
                                                    />
                                                )
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field

                                            name="confirmPassword">
                                            {
                                                props => (
                                                    <PasswordControl
                                                        fullWidth
                                                        name={props.input.name}
                                                        value={props.input.value}
                                                        onChange={props.input.onChange}
                                                        meta={props.meta}
                                                    />
                                                )
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            {this.props.user.isLoggedIn ? 'Update' : 'Register'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    )}
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        notification: state.notification,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchUser, updateUser, regsiterUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);