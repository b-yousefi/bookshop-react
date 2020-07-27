import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import ShoppingCart from "./shopping_cart";
import AddressList from "./list_address";
import {NavLink, Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {completeOrder} from "../actions/actions_order";
import {connect} from "react-redux";


class Order extends Component {

    state = {
        activeStep: 0,
        address: undefined,
    }
    steps = ['Check Order', 'Select an address', 'Finalize'];

    setActiveStep = (activeStep) => {
        this.setState({activeStep})
    }

    setAddress = (address) => {
        this.setState({address})
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <ShoppingCart edit_count={true}/>;
            case 1:
                return (
                    <Box display={"flex"} flexDirection={"column"} m={2}>
                        <AddressList setAddress={this.setAddress} address={this.state.address} view={true}/>
                        <Button variant="contained" color="primary" style={{marginBottom: 5}}
                                component={NavLink} to="/addresses">
                            Add or Edit Addresses
                        </Button>
                    </Box>
                );
            case 2:
                return (
                    <Box display={"flex"} flexDirection={"column"} m={2}>
                        <ShoppingCart edit_count={false} report={true}/>
                        <Typography variant={"body1"}>Sent to address: {this.state.address.address}</Typography>
                    </Box>
                );
            default:
                return 'Unknown stepIndex';
        }
    }

    handleNext = () => {
        if (this.state.activeStep === this.steps.length - 1) {
            this.props.completeOrder(this.state.address);
            this.setActiveStep(this.state.activeStep + 1);
        } else {
            this.setActiveStep(this.state.activeStep + 1);
        }
    };

    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1);
    };

    handleReset = () => {
        this.setActiveStep(0);
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Grid container justify={"center"}>
                    {this.state.activeStep === this.steps.length ? (
                        <Redirect to={"/user_info/orders"}/>
                    ) : (

                        <Grid item xs={12} md={8}>
                            {this.getStepContent(this.state.activeStep)}
                            <Box>
                                <Button
                                    disabled={this.state.activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.handleNext}
                                        disabled={this.state.activeStep === 1 && this.state.address === undefined}>
                                    {this.state.activeStep === this.steps.length - 1 ? 'Complete order' : 'Next'}
                                </Button>
                            </Box>
                        </Grid>

                    )}
                </Grid>
            </div>
        );
    }
}

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
});

function mapStateToProps(state) {
    return {
        notification: state.notification,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({completeOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Order));