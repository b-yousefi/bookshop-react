import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Button, Divider, Grid, List, Typography} from '@material-ui/core';
import ShoppingCartItem from "./item_shopping_cart";

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
        this.props.onClick();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <List dense className={classes.list}>
                    {[...this.props.shopping_cart.orderItems.keys()].map(orderItemId => {
                        const orderItem = this.props.shopping_cart.orderItems.get(orderItemId);
                        return (
                            <ShoppingCartItem orderItem={orderItem} key={orderItem.id}
                                              onListItemClicked={this.onListItemClicked}/>
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
                        <Button variant="contained" color="primary" style={{width: "100%"}}>Order</Button>
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