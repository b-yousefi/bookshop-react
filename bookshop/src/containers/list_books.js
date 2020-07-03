import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from '@material-ui/core';
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
                        }} style={{ height: "100%" }}>
                        <CardMedia
                            className={classes.media}
                            image={`data:image/jpeg;base64,${book.picture.data}`}
                            title={book.name}
                        />
                        <CardContent component="div" style={{ height: "100%" }}>
                            <Typography gutterBottom component="h5">
                                {book.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
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
        height: "100%"
    },
    media: {
        height: 0,
        paddingTop: '130%',
    },
});

function mapStateToProps(state) {
    return {
        books: state.books,
    }
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(BooKList));