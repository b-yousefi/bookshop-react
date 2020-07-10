import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Badge,
    Box,
    Tooltip,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {
    Link,
} from 'react-router-dom';

class BooKList extends Component {

    create_item(key, book) {
        const { classes } = this.props;
        return (
            <Grid key={key} item xs={4} md={3} height="100%"  >
                <Card className={classes.mediaroot}>
                    <CardActionArea component={Link}
                        to={{
                            pathname: `/books/${key}`,
                        }} >
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
                            <Box alignSelf="center" flexGrow={1} >
                                <Typography gutterBottom component="h5" >
                                    Price: {book.price}$
                                </Typography>
                            </Box>
                            <Box>
                                {/* todo: if already exist show the remove button */}
                                <Tooltip title="Remove from shopping cart" aria-label="remove from shopping cart">
                                <IconButton aria-label="remove from shopping cart">
                                    <RemoveShoppingCartIcon />
                                </IconButton>
                                </Tooltip>
                                <Tooltip title="Add to shopping cart" aria-label="add to shopping cart">
                                <IconButton aria-label="add to shopping cart" disabled={book.quantity === 0}>
                                    <Badge badgeContent={4} color="secondary">
                                        <AddShoppingCartIcon />
                                    </Badge>
                                </IconButton>
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
            <Grid container item spacing={2}>
                {[...books.keys()].map(key => {
                    return this.create_item(key, books.get(key))
                }
                )}
            </Grid>
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
    }
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(BooKList));