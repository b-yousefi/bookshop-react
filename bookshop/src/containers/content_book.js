import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    CardMedia,
    Typography,
    Paper,
    List,
} from '@material-ui/core';

import { makeGetBook } from '../reducers/selectors';

class BookContent extends Component {

    render() {
        if (this.props.book) {
            const book = this.props.book;
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>

                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Paper style={{ width: "100%" }}>
                            <Grid container>
                                <Grid item xs={2} md={4} >
                                    <CardMedia
                                        style={{ height: 0, paddingTop: '150%' }}
                                        image={`data:image/jpeg;base64,${book.picture.data}`}
                                        title={book.name}
                                    />
                                </Grid>
                                <Grid item xs={8} md={8} style={{ padding: 16 }}>
                                    <List component="div">
                                        <Typography component="h4" variant="h2">{book.name}</Typography>
                                        {/* <Typography variant="subtitle1" gutterBottom>
                                    Born: {author.birthday ? this.getDateString(author.birthday) : ""}
                                </Typography> */}
                                        <Typography variant="body1" align="justify" gutterBottom>
                                            {book.summary}
                                        </Typography>
                                    </List>

                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            )
        } else {
            return ""
        }
    }
}

function mapStateToProps(state, props) {
    const getBook = makeGetBook();
    console.log(props.match.params.id);
    console.log(props.location.state.bookId);
    return {
        book: getBook(state, props.location.state.bookId)
    }
}


export default connect(mapStateToProps, null)(BookContent);