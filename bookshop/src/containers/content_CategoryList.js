import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Paper,
    List,
    Typography,
    Breadcrumbs,
    Grid,
    ListSubheader,
} from '@material-ui/core';
import _ from 'lodash';

import SubCategory from '../components/subCategoryList';
import { makeGetCategory } from '../reducers/selectors';
import CategoryLink from './link_category';
import BookList from './list_books';
import Search from './panel_search';
import { clearFilter } from '../actions/actions_filter';
import { selectCategory } from '../actions/actions_categories';
import { filterBooks } from '../actions/actions_book';

class CategoryListContent extends Component {

    componentDidMount() {
        if (this.props.category) {
            this.props.selectCategory(this.props.category);
            this.props.filterBooks();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category === undefined || !_.isEqual(this.props.category, prevProps.category)) {
            this.props.selectCategory(this.props.category);
            this.props.filterBooks();
        }
    }

    componentWillUnmount() {
        this.props.clearFilter();
    }

    create_breadcrumbs() {
        var parentArr = this.props.category.parent.split('&');
        return (
            <Breadcrumbs aria-label="breadcrumb">
                {
                    parentArr.slice(1).map(item => {
                        return <CategoryLink categoryId={item} key={item} />
                    })
                }
                <div />
            </Breadcrumbs>
        );
    }

    render() {
        if (this.props.category) {
            return (
                <Grid container spacing={1} >
                    <Grid item xs={12} md={3}>
                        <Paper>
                            {this.props.category.subCategories && this.props.category.subCategories.length > 0 ?

                                <List component="nav">
                                    <ListSubheader>
                                        SubCategories
                                    </ListSubheader>
                                    <SubCategory category={this.props.category} />
                                </List>
                                : ""
                            }
                            <Search hideCategoryFilter={true} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={9} >
                        <Paper style={{ padding: 16 }}>
                            {this.create_breadcrumbs()}
                            <Typography variant="h4" gutterBottom>
                                {this.props.category.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {this.props.category.description}
                            </Typography>

                            <BookList match={this.props.match} categoryIds={[this.props.category]} />

                        </Paper >
                    </Grid>

                </Grid>

            );
        } else {
            return ""
        }

    }
}

function mapStateToProps(state, props) {
    const getCategory = makeGetCategory();
    return {
        category: getCategory(state, props.match.params.id),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearFilter, filterBooks, selectCategory }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContent);