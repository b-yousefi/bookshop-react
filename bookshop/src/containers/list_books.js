import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    Route,
    Switch,
} from 'react-router-dom';

import BookContent from './content_book';
import Search from './panel_search';
import { fetchBooks } from '../actions/actions_book';

class BooKList extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    create_item(key, book) {
        const { classes } = this.props;
        return (
            <Grid key={key} item xs={4} md={3} height="100%"  >
                <Card className={classes.mediaroot}>
                    <CardActionArea component={Link}
                        to={{
                            pathname: `${this.props.match.url}/${key}`,
                            state: {
                                bookId: key
                            }
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
                            {/* <Typography variant="body2" color="textSecondary" component="h5">
                                Born: {author.birthday ? this.getDateString(author.birthday) : ""}
                            </Typography> */}
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
            <Grid container spacing={2} >
                <Switch>
                    <Route exact path={`${this.props.match.url}`}>
                        <Grid item xs={12} md={3}>
                            <Search />
                        </Grid>
                        <Grid item container xs={12} md={9} spacing={1}>
                            {[...books.keys()].map(key => {
                                return this.create_item(key, books.get(key))
                            }
                            )}
                        </Grid>
                    </Route>
                    <Route exact path={`${this.props.match.url}/:id`} component={BookContent} />

                    {/* <Route exact path={`${this.props.match.url}/:id`}>
                        <Grid item xs={12} md={3}>

                        </Grid>
                        <Grid item>
                            <BookContent />
                        </Grid>
                    </Route> */}
                </Switch>
                {/* </Grid> */}
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
        filter: state.filter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BooKList));