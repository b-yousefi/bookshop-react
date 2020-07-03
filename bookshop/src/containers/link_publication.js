import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { makeGetPublication } from '../reducers/selectors';

class PublicationLink extends Component {
    render() {
        if (!this.props.publication) {
            return "";
        }

        return (
            <Link color="inherit" component={NavLink}
                to={{
                    pathname: `/publications`,
                }}  >
                {this.props.publication.name}
            </Link>
        )
    }
}

function mapStateToProps(state, props) {
    const getPublication = makeGetPublication();
    return {
        publication: getPublication(state, props.publicationId.toString())
    }
}

export default connect(mapStateToProps, null)(PublicationLink);
