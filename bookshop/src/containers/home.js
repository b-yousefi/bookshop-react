import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid,
    Paper,
} from '@material-ui/core';

import Search from './panel_search';
import BookList from './list_books';
import { clearFilter } from '../actions/actions_filter';
import { filterBooks } from '../actions/actions_book';

class Home extends Component {

    componentDidMount() {
        console.log("Home componentDidMount");
        // this.props.clearFilter();
        this.props.filterBooks();
    }

    render() {
        return (
            <Grid container spacing={2} >
                <Grid item xs={12} md={3}>
                    <Paper>
                        <Search />
                    </Paper>
                </Grid>
                <Grid item container xs={12} md={9} spacing={2}>
                    <BookList match={this.props.match} />
                </Grid>
            </Grid>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearFilter, filterBooks }, dispatch);
}

export default connect(null, mapDispatchToProps)(Home);