import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    CardMedia,
    Typography,
    Paper,
    List,
    Breadcrumbs,
} from '@material-ui/core';

import { makeGetBook } from '../reducers/selectors';
import AuthorLink from './link_author';
import CategoryLink from './link_category';
import PublicationLink from './link_publication';

class BookContent extends Component {

    render() {
        if (this.props.book) {
            const book = this.props.book;
            return (
                <Grid container spacing={2} style={{ padding: 20 }}>
                    <Grid item md={2}>

                    </Grid>
                    <Grid item container xs={12} md={8} spacing={2} component={Paper} >
                        {/* <Paper style={{ width: "100%" }}> */}
                        <Grid item container>
                            <Grid item xs={12} md={4} >
                                <CardMedia
                                    style={{ height: 0, paddingTop: '150%' }}
                                    image={`data:image/jpeg;base64,${book.picture.data}`}
                                    title={book.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} style={{ padding: 16 }}>
                                <List component="div">
                                    <Typography component="h4" variant="h2">{book.name}</Typography>
                                    <Typography variant="body1" align="justify" gutterBottom>
                                        {book.summary}
                                    </Typography>
                                </List>
                            </Grid>
                        </Grid>
                        <Grid item container >
                            <Grid item xs={4} md={2}>
                                <Typography variant="body1" gutterBottom>
                                    Authors:
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Breadcrumbs aria-label="breadcrumb" separator=",">
                                    {
                                        book.authorIds.map(id => {
                                            return <AuthorLink key={id} authorId={id} />;
                                        })
                                    }
                                </Breadcrumbs>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Typography variant="body1" gutterBottom>
                                    Categories:
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Breadcrumbs aria-label="breadcrumb" separator=",">
                                    {
                                        book.categoryIds.map(id => {
                                            return <CategoryLink categoryId={id} key={id} />
                                        })

                                    }
                                </Breadcrumbs>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <Typography variant="body1" gutterBottom>
                                    Publication:
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Breadcrumbs aria-label="breadcrumb" separator=",">
                                    <PublicationLink publicationId={book.publicationId} />
                                </Breadcrumbs>
                            </Grid>
                        </Grid>
                        {/* </Paper>*/}
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
    return {
        book: getBook(state, Number(props.match.params.id))
    }
}


export default connect(mapStateToProps, null)(BookContent);