import React, { Component } from 'react';
import {
    Link,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { makeGetCategory } from '../reducers/selectors';


class CategoryLink extends Component {
    render() {
        return (
            <Link color="inherit" component={NavLink}
                to={{
                    pathname: `/categories/${this.props.category.id}`,
                }}  >
                {this.props.category.name}
            </Link>
        )
    }
}

function mapStateToProps(state, props) {
    const getCategory = makeGetCategory();
    return {
        category: getCategory(state, props.categoryId)
    }
}


export default connect(mapStateToProps, null)(CategoryLink);