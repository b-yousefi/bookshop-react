import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid,
    Button,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    IconButton,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

import { fetchPublications } from '../actions/actions_publicaion';


class PublicationList extends Component {

    create_item(key, publication) {
        return (
            <Grid key={key} item xs={12}>
                <Card >
                    <CardHeader title={publication.name}
                        action={
                            <IconButton aria-label="settings" href={publication.website}>
                                <FontAwesomeIcon icon="link" />
                            </IconButton>
                        }
                    >
                    </CardHeader>
                    <CardContent>
                        <Typography variant="body1" align="justify" gutterBottom>
                            {publication.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" color="primary" component={NavLink} to="/authors">
                            Authors
                        </Button>
                        <Button size="medium" color="primary">
                            Books
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    render() {
        const publications = this.props.publications;
        if (!publications) {
            return "";
        }
        return (
            <Grid container >
                <Grid item md={2} >
                </Grid>
                <Grid container item md={8} spacing={1} >
                    {[...publications.keys()].map(key => {
                        return this.create_item(key, publications.get(key))
                    })}
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        publications: state.publications
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPublications }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationList);