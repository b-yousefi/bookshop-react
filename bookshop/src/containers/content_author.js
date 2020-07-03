import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid,
    CardMedia,
    Typography,
    Paper,
    List,
} from '@material-ui/core';

import { makeGetAuthor } from '../reducers/selectors';
import { clearFilter } from '../actions/actions_filter';
import { selectAuthor } from '../actions/action_authors';
import { filterBooks } from '../actions/actions_book';
import BookList from './list_books';
import Search from './panel_search';


class AuthorContent extends Component {

    //todo: change
    getDateString(str) {
        var date = new Date(str.substring(0, 10));
        const month = date.toLocaleString('default', { month: 'long' });
        return `${date.getDate()} ${month} ${date.getFullYear()}`;
    }

    componentDidMount() {
        this.props.selectAuthor(this.props.author);
        this.props.filterBooks();
    }

    componentWillUnmount() {
        this.props.clearFilter();
    }

    render() {
        if (this.props.author) {
            const author = this.props.author;
            return (
                <Paper >
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={3}>
                            <Search hideAuthorFilter={true} />
                        </Grid>
                        <Grid container item xs={12} md={9}>
                            <Grid item xs={12} md={4} >
                                <CardMedia
                                    style={{ height: 0, paddingTop: '100%' }}
                                    image={`data:image/jpeg;base64,${author.picture.data}`}
                                    title={author.fullName}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} style={{ padding: 16 }}>
                                <List component="div">
                                    <Typography component="h4" variant="h2">{author.fullName}</Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Born: {author.birthday ? this.getDateString(author.birthday) : ""}
                                    </Typography>
                                    <Typography variant="body1" align="justify" gutterBottom>
                                        {author.description}
                                    </Typography>
                                </List>
                            </Grid>
                            <Grid container item style={{ padding: 16 }}>
                                <BookList match={this.props.match} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )
        } else {
            return ""
        }
    }
}

function mapStateToProps(state, props) {
    const getAuthor = makeGetAuthor();
    return {
        author: getAuthor(state, props.match.params.id),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearFilter, selectAuthor, filterBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorContent);