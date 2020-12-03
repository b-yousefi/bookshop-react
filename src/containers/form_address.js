import React, {Component} from "react";
import {connect} from 'react-redux';
import {Field, Form} from "react-final-form";
import {Button, Grid, Paper} from "@material-ui/core";
import {TextField} from "final-form-material-ui";
import {addAddress, ADDRESS_ACTIONS, updateAddress} from "../actions/action_address";
import {makeGetAddress} from "../reducers/selectors";
import Map from "../components/map";
import {bindActionCreators} from "redux";
import {COMMON} from "../actions/actions";
import {Redirect} from 'react-router-dom';

class AddressForm extends Component {

    state = {
        map: {
            latitude: undefined,
            longitude: undefined
        }
    }

    onMarkerChanged = (values) => (map) => {
        this.setState({map});
    }

    validate = values => {

        const errors = {};
        if (!values.state) {
            errors.state = 'Required';
        }
        if (!values.city) {
            errors.city = 'Required';
        }
        if (!values.address) {
            errors.address = 'Required';
        }
        return errors;
    };

    onSubmit = async values => {
        console.log("submit")
        if (this.props.address) {
            this.props.updateAddress({...values, link: this.props.address._links.self.href, ...this.state.map});
        } else {
            this.props.addAddress({...values, ...this.state.map});
        }
    }

    render() {
        const notif = this.props.notification;
        if (notif && (notif.cause === ADDRESS_ACTIONS.CREATE || notif.cause === ADDRESS_ACTIONS.UPDATE) && notif.severity === COMMON.SUCCESS) {
            return <Redirect to="/addresses"/>
        }
        return (
            <div style={{padding: 16, margin: 'auto', maxWidth: 450}}>
                <Form
                    width="50px"
                    onSubmit={this.onSubmit}
                    initialValues={this.props.address ? this.props.address : {}}
                    validate={this.validate}
                    render={({handleSubmit, reset, submitting, pristine, values}) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{padding: 16}}>

                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            fullWidth
                                            name="state"
                                            required
                                            component={TextField}
                                            type="text"
                                            label="State"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            required
                                            name="city"
                                            component={TextField}
                                            type="text"
                                            label="City"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            name="zipCode"
                                            component={TextField}
                                            type="number"
                                            label="zipCode"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="address"
                                            required
                                            component={TextField}
                                            type="text"
                                            label="Address"
                                            multiline
                                            rowsMax={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="map"
                                        >
                                            {props => (
                                                <div style={{height: "400px"}}>
                                                    <Map
                                                        lon={this.props.address ? this.props.address.longitude : 51.3890}
                                                        lat={this.props.address ? this.props.address.latitude : 35.6892}
                                                        editable={true}
                                                        onMarkerChanged={this.onMarkerChanged(values)}/>
                                                </div>

                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}
                                        >
                                            {this.props.address ? 'Update' : 'Add'}
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

function mapStateToProps(state, props) {
    const getAddress = makeGetAddress();
    return {
        address: getAddress(state, props.match.params.id),
        notification: state.notification,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addAddress, updateAddress}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);