import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Hidden, Typography,} from '@material-ui/core';
import {Route, Switch,Link,} from 'react-router-dom';

import AuthorContent from './content_author';

class AuthorList extends Component {

    getDateString(str) {
        const date = new Date(str.substring(0, 10));
        const month = date.toLocaleString('default', {month: 'long'});
        return `${date.getDate()} ${month} ${date.getFullYear()}`;
    }

    getDateStringBrief(str) {
        const date = new Date(str.substring(0, 10));
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    create_item(key, author, classes) {
        return (
            <Grid key={key} item xs={6} md={3}>
                <Card className={classes.mediaroot}>
                    <CardActionArea
                        component={Link}
                        to={{
                            pathname: `${this.props.match.url}/${key}`,
                        }}>
                        <CardMedia
                            className={classes.media}
                            image={`data:image/jpeg;base64,${author.picture.data}`}
                            title={author.fullName}

                        />
                        <CardContent component="div" className={classes.title} title={author.fullName}>
                            <Typography noWrap gutterBottom variant="h5" component="h2">
                                {author.fullName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="h5">
                                <Hidden smUp>
                                    Born: {author.birthday ? this.getDateStringBrief(author.birthday) : ""}
                                </Hidden>
                                <Hidden xsDown>
                                    Born: {author.birthday ? this.getDateString(author.birthday) : ""}
                                </Hidden>
                            </Typography>
                        </CardContent>
                    </CardActionArea>

                </Card>
            </Grid>
        );
    }

    render() {
        const {classes} = this.props;

        if (!this.props.authors) {
            return "";
        }
        const authors = this.props.authors;

        return (
            <Grid container spacing={1}>
                <Switch>
                    <Route exact path={`${this.props.match.url}`}>
                        <Grid item md={2}>
                        </Grid>
                        <Grid container item xs={12} md={8} spacing={2}>
                            {[...authors.keys()].map(key => {
                                    return this.create_item(key, authors.get(key), classes)
                                }
                            )}
                        </Grid>
                    </Route>
                    <Route exact path={`${this.props.match.url}/:id`} component={AuthorContent}/>
                </Switch>

            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        authors: state.authors
    }
}

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    mediaroot: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        // flexDirection: 'column',
        height: '100%',
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // height: /* Just enough to show 2 lines */
    }
});

export default connect(mapStateToProps, null)(withStyles(useStyles)(AuthorList));