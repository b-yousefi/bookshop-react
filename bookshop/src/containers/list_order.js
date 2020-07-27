import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {Box, Typography,} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import {fetchOrders} from "../actions/actions_order";
import OrderContent from "./content_order";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

class OrderList extends Component {

    state = {
        page: 1,
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    handlePageChange = (event, value) => {
        this.setState({page: value});
        this.props.fetchOrders(value);
    }

    create_item(key, order) {

        return (
            <ListItem key={key} button component={NavLink}
                      to={{
                          pathname: `${this.props.match.url}/${key}`,
                      }}
            >
                {/*<ListItemText primary={`Total Price: ${order.totalPrice}$`} secondary={`Status: ${order.currentStatus.status}*/}
                {/*Last changed at: ${order.currentStatus.updatedAt.substr(0,10)}, ${order.currentStatus.updatedAt.substr(11,5)}`}/>*/}
                <Grid container>
                    <Grid item xs={7}>
                        <Typography variant="body1" align="justify" gutterBottom>
                            Total Price: {order.totalPrice}$
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="body1" align="justify" gutterBottom>
                            Status: {order.currentStatus.status}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="textSecondary" align="justify" gutterBottom>
                            Last changed
                            at: {order.currentStatus.updatedAt.substr(0, 10)}, {order.currentStatus.updatedAt.substr(11, 5)}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
        );
    }

    render() {
        const {classes} = this.props;

        if (!this.props.orders) {
            return "";
        }
        const orders = this.props.orders;
        console.log(orders)
        return (
            <Box display="flex" justifyContent="center">
                <Switch>
                    <Route exact path={`${this.props.match.url}`}>
                        <Box flexDirection={"column"} className={classes.root}>
                            <List className={classes.list}>
                                {[...orders.map.keys()].map(key => {
                                        return this.create_item(key, orders.map.get(key))
                                    }
                                )}
                            </List>
                            <Box display="flex" justifyContent="center" m={1} p={1} style={{width: '100%'}}>
                                {this.props.orders.page && this.props.orders.page.totalPages > 1 &&
                                <Pagination color="secondary" count={orders.page.totalPages}
                                            page={this.state.page}
                                            onChange={this.handlePageChange}
                                />
                                }
                            </Box>
                        </Box>

                    </Route>
                    <Route path={`${this.props.match.url}/:id`} component={OrderContent}/>
                </Switch>
            </Box>
        );
    }
}

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        maxWidth: 800,
    },
    list: {
        // maxHeight: 500,
    }
});

function mapStateToProps(state) {
    return {
        orders: state.orders,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchOrders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(withRouter(OrderList)));