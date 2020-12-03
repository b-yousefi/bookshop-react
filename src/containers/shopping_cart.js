import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Button, Divider, Grid, List, Typography} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import OrderItem from "./item_order";

const useStyles = theme => ({
    root: {
        // width: '60vw',
        maxWidth: 'auto',
        maxHeight: 'auto',
        backgroundColor: theme.palette.background.paper,

    },
    list: {
        maxHeight: '60vh',
        width: 'auto',
        minWidth: '30vw',
        maxWidth: '90vw',
        overflow: 'auto',
    }
});

class ShoppingCart extends Component {
    onListItemClicked = () => {
        if (this.props.onClick)
            this.props.onClick();
    }

    render() {
        const {classes} = this.props;
        if (!this.props.shopping_cart) {
            return ""
        }
        return (
            <div className={classes.root}>
                <List dense className={classes.list}>
                    {[...this.props.shopping_cart.orderItems.keys()].map(orderItemId => {
                        const orderItem = this.props.shopping_cart.orderItems.get(orderItemId);
                        return (
                            <OrderItem orderItem={orderItem} key={orderItem.id}
                                              onListItemClicked={this.onListItemClicked}
                                              edit_count={this.props.edit_count}
                                              report={this.props.report}/>
                        );
                    })}
                </List>
                <Divider variant="middle"/>
                <Grid container style={{padding: 16}} spacing={2} alignItems={"center"}>
                    <Grid item xs={6} md={4}>
                        <Typography variant="body1">Total price</Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Typography variant="body1">{this.props.shopping_cart.totalPrice}$</Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        {this.props.show_order_button &&
                            <Button variant="contained"
                                    onClick={ this.onListItemClicked}
                                    color="primary"
                                    component={NavLink} to="/order"
                                    style={{width: "100%"}}>Order</Button>
                        }
                    </Grid>
                </Grid>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        shopping_cart: state.shopping_cart,
    }
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(ShoppingCart));