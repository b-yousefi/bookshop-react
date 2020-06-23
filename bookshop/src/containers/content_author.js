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
import { fetchAuthors } from '../actions/action_authors';

class AuthorContent extends Component {

    //todo: change
    getDateString(str) {
        var date = new Date(str.substring(0, 10));
        const month = date.toLocaleString('default', { month: 'long' });
        return `${date.getDate()} ${month} ${date.getFullYear()}`;
    }

    render() {
        if (this.props.author) {
            const author = this.props.author;
            return (

                <Paper style={{ width: "100%" }}>
                    <Grid container>
                        <Grid item xs={8} md={8} style={{ padding: 16 }}>
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
                        <Grid item xs={2} md={4} >
                            <CardMedia
                                style={{ height: 0, paddingTop: '100%' }}
                                image={`data:image/jpeg;base64,${author.picture.data}`}
                                title={author.fullName}
                            />
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
        author: getAuthor(state, props.location.state.authorId),
        authors: state.authors
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAuthors }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorContent);