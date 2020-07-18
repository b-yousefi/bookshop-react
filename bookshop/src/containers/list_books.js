import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {
    Badge,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {Link,} from 'react-router-dom';

import {addBookToShoppingCart, removeBookFromShoppingCart} from '../actions/actions_shopping_cart';
import SignInAlertDialog from '../components/dialog_signin';
import {getBooksInShoppingCart} from "../reducers/selectors";

class BooKList extends Component {

    state = {
        open_signIn: false,
    }

    addToCartClicked = (book) => () => {
        if (this.props.user.isLoggedIn) {
            this.props.addBookToShoppingCart(book, 1);
        } else {
            this.setState({open_signIn: true});
        }
    }

    removeFromCartClicked = (book) => () => {
        this.props.removeBookFromShoppingCart(book, 1);
    }

    create_item(key, book) {
        const {classes} = this.props;
        let book_order_count = 0;
        if (this.props.booksInShoppingCart && this.props.booksInShoppingCart.has(book.id)) {
            book_order_count = this.props.booksInShoppingCart.get(book.id).count;
        }

        return (
            <Grid key={key} item xs={4} md={3} height="100%">
                <Card className={classes.mediaroot}>
                    <CardActionArea component={Link}
                                    to={{
                                        pathname: `/books/${key}`,
                                    }}>
                        <CardMedia
                            className={classes.media}
                            image={`data:image/jpeg;base64,${book.picture.data}`}
                            title={book.name}
                        />

                        <CardContent component="div" className={classes.title} title={book.name}>
                            <Typography noWrap gutterBottom component="h5">
                                {book.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing>
                        <Box display="flex" flexDirection="row" width="100%">
                            <Box alignSelf="center" flexGrow={1}>
                                <Typography gutterBottom component="h5">
                                    Price: {book.price}$
                                </Typography>
                            </Box>
                            <Box>
                                {/* todo: if already exist show the remove button */}
                                <Tooltip title="Remove from shopping cart" aria-label="remove from shopping cart">
                                    <span>
                                        <IconButton aria-label="remove from shopping cart"
                                                    disabled={book_order_count === 0}
                                                    onClick={this.removeFromCartClicked(book)}>
                                            <RemoveShoppingCartIcon/>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Add to shopping cart" aria-label="add to shopping cart">
                                    <span>
                                        <IconButton aria-label="add to shopping cart" disabled={book.quantity === 0}
                                                    onClick={this.addToCartClicked(book)}>
                                            <Badge badgeContent={book_order_count} color="secondary">
                                                <AddShoppingCartIcon/>
                                            </Badge>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    render() {

        if (!this.props.books) {
            return "";
        }
        const books = this.props.books;
        return (
            <React.Fragment>
                <Grid container item spacing={2}>
                    {[...books.keys()].map(key => {
                            return this.create_item(key, books.get(key))
                        }
                    )}
                </Grid>
                <SignInAlertDialog open={this.state.open_signIn}
                                   setOpen={(open) => this.setState({open_signIn: open})}/>
            </React.Fragment>
        );
    }
}

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    mediaroot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '130%',
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // height: /* Just enough to show 2 lines */
    }
});

function mapStateToProps(state) {
    return {
        books: state.books,
        user: state.user,
        booksInShoppingCart: getBooksInShoppingCart(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addBookToShoppingCart, removeBookFromShoppingCart}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BooKList));