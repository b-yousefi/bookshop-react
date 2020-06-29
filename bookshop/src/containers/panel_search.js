import React, { Component } from 'react';
import CheckboxesTags from '../components/CheckboxesTags';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    List,
    ListItem,
    ListSubheader,
    Paper,
} from '@material-ui/core';

import { setFilter, clearFilter } from '../actions/actions_filter';
import { filterBooks } from '../actions/actions_book';



class SearchPanel extends Component {

    state = {
        filter: this.props.filter
    }

    onChange = (name, newValue) => {
        let filter = this.state.filter;
        filter[name] = newValue;
        this.setState({ filter });
        this.props.filterBooks(this.state.filter);
    }

    render() {
        return (
            <Paper>
                <List >
                    <ListSubheader style={{ backgroundColor: "cadetblue", color: "white" }}>
                        Filters
                    </ListSubheader>
                    {this.props.categories ?
                        <ListItem >
                            <CheckboxesTags width='100%'
                                name="categoryIds"
                                value={this.state.filter.categoryIds}
                                onChange={this.onChange}
                                options={Object.values(this.props.categories)}
                                getOptionLabel={(option) => option.name}
                                label="categories"
                                placeholder="category"
                                getOptionSelected={(option, value) => {
                                    return option.name === value.name;
                                }}
                                itemValue="name"
                            />
                        </ListItem>
                        : ''}
                    {this.props.authors ?
                        <ListItem>
                            <CheckboxesTags width='100%'
                                name="authorIds"
                                value={this.state.filter.authorIds}
                                onChange={this.onChange}
                                options={Array.from(this.props.authors.values())}
                                getOptionLabel={(option) => option.fullName}
                                label="authors"
                                placeholder="author"
                                getOptionSelected={(option, value) => {
                                    return option.fullName === value.fullName;
                                }}
                                itemValue="fullName"
                            />
                        </ListItem>
                        : ''}
                    {this.props.publications ?
                        <ListItem>
                            <CheckboxesTags width='100%'
                                name="publicationIds"
                                value={this.state.filter.publicationIds}
                                onChange={this.onChange}
                                options={Array.from(this.props.publications.values())}
                                getOptionLabel={(option) => option.name}
                                label="publications"
                                placeholder="publication"
                                getOptionSelected={(option, value) => {
                                    return option.name === value.name;
                                }}
                                itemValue="name"
                            />
                        </ListItem>
                        : ''}

                </List>
            </Paper>
        )
    }

}

function mapStateToProps(state) {
    return {
        categories: state.categories_flat,
        authors: state.authors,
        publications: state.publications,
        filter: state.filter,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setFilter, clearFilter, filterBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);