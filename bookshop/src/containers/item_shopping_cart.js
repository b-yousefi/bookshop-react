import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {updateShoppingCart} from "../actions/actions_shopping_cart";

class ShoppingCartItem extends Component {

    state = {
        quantity: this.props.orderItem.quantity,
    }

    onCountChanged = event => {
        this.setState({quantity: event.target.value})
    }

    itemClicked = (id) => () => {
        this.props.history.push(`/books/${id}`)
        this.props.onListItemClicked();
    }

    deleteClicked = (orderItem) => () => {
        this.props.updateShoppingCart(orderItem.book, 0);
    }

    render() {
        const orderItem = this.props.orderItem;
        return (
            <ListItem button onClick={this.itemClicked(orderItem.book.id)}>
                <ListItemAvatar>
                    <Avatar
                        variant="rounded"
                        alt={orderItem.book.name}
                        src={`data:image/jpeg;base64,${orderItem.book.picture.data}`}
                    />
                </ListItemAvatar>
                <ListItemText primary={<Typography noWrap gutterBottom component="h5">
                    {orderItem.book.name}
                </Typography>}
                              secondary={
                                  `Price: ${orderItem.book.price}$ Count: ${orderItem.quantity}`
                              }/>
                <ListItemSecondaryAction>
                    {/*<TextField*/}
                    {/*    style={{maxWidth:50}}*/}
                    {/*    id="standard-error-helper-text"*/}
                    {/*    label="Count"*/}
                    {/*    value={this.state.quantity}*/}
                    {/*    onChange={this.onCountChanged}*/}
                    {/*    // helperText="Incorrect entry."*/}
                    {/*/>*/}
                    <IconButton edge="end" aria-label="delete" onClick={this.deleteClicked(orderItem)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

}

function mapPropsToState(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateShoppingCart}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(withRouter(ShoppingCartItem));