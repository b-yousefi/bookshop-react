import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {makeGetOrder} from "../reducers/selectors";
import {connect} from "react-redux";
import {fetchOrderDetail} from '../actions/actions_order';
import {withStyles} from "@material-ui/core/styles";
import {Divider, Grid, List, Typography} from "@material-ui/core";
import OrderItem from "./item_order";
import emptyListPic from "../static/image/emptyList.jpg";
import Box from "@material-ui/core/Box";

class OrderContent extends Component {

    componentDidMount() {
        if (this.props.order)
            this.props.fetchOrderDetail(this.props.order);
    }

    render() {
        const {classes} = this.props;
        if (!this.props.order) {
            return ""
        }
        if (this.props.order.orderItems && this.props.order.orderItems.length > 0) {
            return (
                <div className={classes.root}>
                    <List dense className={classes.list}>
                        {this.props.order.orderItems.map(orderItem => {
                            return (
                                <OrderItem orderItem={orderItem} key={orderItem.id}
                                           edit_count={false}
                                           report={true}/>
                            );
                        })}
                    </List>
                    <Divider variant="middle"/>
                    <Grid container style={{padding: 16}} spacing={2} alignItems={"center"}>
                        <Grid item xs={6} md={4}>
                            <Typography variant="body1">Total price</Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Typography variant="body1">{this.props.order.totalPrice}$</Typography>
                        </Grid>
                    </Grid>
                </div>

            );
        } else {
            return (
                <Box display={"flex"} className={classes.emptyList}>
                    <img
                        src={emptyListPic}
                        alt={"Empty List"}/>
                </Box>
            );
        }
    }
}

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
        minWidth: '50vw',
        maxWidth: '90vw',
        overflow: 'auto',
    },
    emptyList: {
        width: 'auto',
        height: 'auto',
    }
});

function mapStateToProps(state, props) {
    const getOrder = makeGetOrder();
    return {
        order: getOrder(state, Number(props.match.params.id)),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchOrderDetail}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(OrderContent));