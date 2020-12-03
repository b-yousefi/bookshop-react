import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { makeGetAuthor } from '../reducers/selectors';

class AuthorLink extends Component {
    render() {
        if (!this.props.author) {
            return "";
        }

        return (
            <Link color="inherit" component={NavLink}
                to={{
                    pathname: `/authors/${this.props.authorId}`,
                }}  >
                {this.props.author.fullName}
            </Link>
        )
    }
}

function mapStateToProps(state, props) {
    const getAuthor = makeGetAuthor();
    return {
        author: getAuthor(state, props.authorId.toString()),
    }
}

export default connect(mapStateToProps, null)(AuthorLink);
