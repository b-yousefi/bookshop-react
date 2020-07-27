import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Box, Typography} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

import {updateShoppingCart} from "../actions/actions_shopping_cart";

class OrderItem extends Component {

    state = {
        quantity: this.props.orderItem.quantity,
        errors: {
            count: undefined,
        }
    }

    onCountChanged = event => {
        if (event.target.value > 0) {
            this.setState({quantity: event.target.value});
        } else if (event.target.value === 0) {
            this.setState({errors: {count: "Count cannot be zero"}});
        } else {
            this.setState({errors: {count: "Count cannot be negative"}});
        }

    }

    onMouseLeave = (orderItem) => () => {
        if (orderItem.quantity !== this.state.quantity)
            this.props.updateShoppingCart(orderItem.book, this.state.quantity);
    }

    itemClicked = (id) => () => {
        this.props.history.push(`/books/${id}`);
        if (this.props.onListItemClicked)
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
                              secondary={this.props.edit_count ? `Price: ${orderItem.book.price}$` :
                                  `Price: ${orderItem.book.price}$ Count: ${orderItem.quantity}`
                              }/>
                <ListItemSecondaryAction style={{width: "30%"}}>
                    <Box display="flex" flexDirection="row" style={{width: "100%"}}>
                        <Box flexGrow={1}>
                            {this.props.edit_count &&
                            <TextField
                                style={{maxWidth: 100}}
                                id="standard-error-helper-text"
                                label="Count"
                                type="number"
                                value={this.state.quantity}
                                onChange={this.onCountChanged}
                                onBlur={this.onMouseLeave(orderItem)}
                                error={this.state.errors.count}
                                helperText={this.state.errors.count ? this.state.errors.count : ""}
                            />}
                        </Box>
                        {!this.props.report &&
                        <Box>
                            <IconButton name="delete" edge="end" aria-label="delete"
                                        onClick={this.deleteClicked(orderItem)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                        }
                    </Box>


                </ListItemSecondaryAction>
            </ListItem>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateShoppingCart}, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(OrderItem));