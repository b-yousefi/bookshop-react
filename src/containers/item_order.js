import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Box, CardMedia, Typography} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

import {updateShoppingCart} from "../actions/actions_shopping_cart";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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
        const {classes} = this.props;
        return (
            <ListItem button onClick={this.itemClicked(orderItem.book.id)}>
                <ListItemAvatar>
                    <CardMedia
                        className={classes.media}
                        image={`data:image/jpeg;base64,${orderItem.book.picture.data}`}
                        title={orderItem.book.name}
                        component={Paper}
                    />
                </ListItemAvatar>
                <ListItemText primary={<Typography className={classes.title} gutterBottom component="h5">
                    {orderItem.book.name}
                </Typography>}
                              secondary={
                                  <Box display="flex" flexDirection="row">
                                      <Box style={{width: 150}}>
                                          <Typography gutterBottom component="h5">
                                              Price: {orderItem.book.price}$
                                          </Typography>
                                      </Box>
                                      {!this.props.edit_count &&
                                      <Box>
                                          <Typography noWrap gutterBottom component="h5">
                                              Count: {orderItem.quantity}
                                          </Typography>
                                      </Box>
                                      }
                                  </Box>
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

const useStyles = theme => ({
    title: {
        [theme.breakpoints.down('sm')]: {
            width: 150
        }
    },
    media: {
        height: 70,
        margin: 2,
        marginRight: 10
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateShoppingCart}, dispatch);
}

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(withRouter(OrderItem)));