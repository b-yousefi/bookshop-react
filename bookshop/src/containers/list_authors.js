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

import { fetchAuthors } from '../actions/action_authors';
import AuthorContent from './content_author';

class AuthorList extends Component {


    componentDidMount() {
        this.props.fetchAuthors();
    }

    getDateString(str) {
        var date = new Date(str.substring(0, 10));
        const month = date.toLocaleString('default', { month: 'long' });
        return `${date.getDate()} ${month} ${date.getFullYear()}`;
    }

    create_item(key, author, classes) {
        return (
            <Grid key={key} item xs={6} md={3} height="100%"  >
                <Card className={classes.mediaroot}>
                    <CardActionArea component={Link}
                        to={{
                            pathname: `/authors/${key}`,
                            state: {
                                authorId: key
                            }
                        }} style={{ height: "100%" }}>
                        <CardMedia
                            className={classes.media}
                            image={`data:image/jpeg;base64,${author.picture.data}`}
                            title={author.fullName}
                        />
                        <CardContent component="div" style={{ height: "100%" }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {author.fullName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="h5">
                                Born: {author.birthday ? this.getDateString(author.birthday) : ""}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;

        if (!this.props.authors) {
            return "";
        }
        const authors = this.props.authors;

        return (
            <Grid container spacing={1} >
                <Grid item xs={4} md={2}>
                </Grid>
                <Grid container item xs={6} md={8} spacing={2} >
                    <Switch>
                        <Route exact path={`${this.props.match.url}`}>
                            {[...authors.keys()].map(key => {
                                return this.create_item(key, authors.get(key), classes)
                            }
                            )}
                        </Route>
                        <Route exact path={`${this.props.match.url}/:id`} component={AuthorContent} />
                    </Switch>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        authors: state.authors
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAuthors }, dispatch);
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
        paddingTop: '100%',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(AuthorList));