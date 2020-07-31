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
import Pagination from "@material-ui/lab/Pagination";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {Link,} from 'react-router-dom';

import {updateShoppingCart} from '../actions/actions_shopping_cart';
import SignInAlertDialog from '../components/dialog_signin';
import {getBooksInShoppingCart} from "../reducers/selectors";
import {filterBooksByPage} from '../actions/actions_book';

class BookList extends Component {

    state = {
        open_signIn: false,
        page: 1,
    }

    addToCartClicked = (book, quantity) => () => {
        if (this.props.user.isLoggedIn) {
            this.props.updateShoppingCart(book, quantity);
        } else {
            this.setState({open_signIn: true});
        }
    }

    removeFromCartClicked = (book, quantity) => () => {
        this.props.updateShoppingCart(book, quantity);
    }

    handleChange = (event, value) => {
        this.setState({page: value});
        this.props.filterBooksByPage(value);
        window.scrollTo(0, 0)
    }

    create_item(key, book) {
        const {classes} = this.props;
        let book_order_count = 0;
        if (this.props.booksInShoppingCart && this.props.booksInShoppingCart.has(book.id)) {
            book_order_count = this.props.booksInShoppingCart.get(book.id).count;
        }

        return (
            <Grid key={key} item xs={6} md={3} sm={4} height="100%">
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

                        <CardContent component="div" className={classes.content} title={book.name}>
                            <Typography noWrap gutterBottom component="h5">
                                {book.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing className={classes.action}>
                        <Grid container width="100%" alignItems={"center"}>
                            <Grid item sm={6} xs={12}>
                                <Typography gutterBottom component="h5" style={{paddingInlineStart: 10}}>
                                    Price:{book.price}$
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Remove from shopping cart" aria-label="remove from shopping cart">
                                    <span>
                                        <IconButton aria-label="remove from shopping cart"
                                                    disabled={book_order_count === 0}
                                                    onClick={this.removeFromCartClicked(book, book_order_count -
                                                        1)}>
                                            <RemoveShoppingCartIcon/>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Add to shopping cart" aria-label="add to shopping cart">
                                    <span>
                                        <IconButton aria-label="add to shopping cart" disabled={book.quantity === 0}
                                                    onClick={this.addToCartClicked(book, book_order_count + 1)}>
                                            <Badge badgeContent={book_order_count} color="secondary">
                                                <AddShoppingCartIcon/>
                                            </Badge>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    render() {

        if (!this.props.books || !this.props.books.map) {
            return "";
        }
        const books = this.props.books.map;
        return (
            <React.Fragment>
                <Grid container item spacing={2}>
                    {[...books.keys()].map(key => {
                            return this.create_item(key, books.get(key))
                        }
                    )}
                </Grid>
                <Box display="flex" justifyContent="center" m={1} p={1} style={{width: '100%'}}>
                    {this.props.books.page && this.props.books.page.totalPages > 1 &&
                    <Pagination color="primary" count={this.props.books.page.totalPages}
                                page={this.state.page}
                                onChange={this.handleChange}
                    />
                    }
                </Box>
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
    content: {
        paddingBottom: 5
    },
    action: {
        paddingTop: 5,
    },
});

function mapStateToProps(state) {
    return {
        books: state.books,
        user: state.user,
        booksInShoppingCart: getBooksInShoppingCart(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateShoppingCart, filterBooksByPage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BookList));