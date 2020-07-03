import React, { Component } from 'react';
import CheckboxesTags from '../components/CheckboxesTags';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    List,
    ListItem,
    ListSubheader,
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
        this.props.setFilter(this.state.filter);
        this.props.filterBooks();
    }

    render() {
        const { categories, authors, publications } = this.props;
        const { categoryIds, authorIds, publicationIds } = this.state.filter;

        return (
            <List >
                <ListSubheader style={{ backgroundColor: "cadetblue", color: "white" }}>
                    Filters
                    </ListSubheader>
                {categories && !this.props.hideCategoryFilter ?
                    <ListItem >
                        <CheckboxesTags width='100%'
                            name="categoryIds"
                            value={categoryIds}
                            onChange={this.onChange}
                            options={Object.values(categories)}
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
                {authors && !this.props.hideAuthorFilter ?
                    <ListItem>
                        <CheckboxesTags width='100%'
                            name="authorIds"
                            value={authorIds}
                            onChange={this.onChange}
                            options={Array.from(authors.values())}
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
                {publications && !this.props.hidePublicationFilter ?
                    <ListItem>
                        <CheckboxesTags width='100%'
                            name="publicationIds"
                            value={publicationIds}
                            onChange={this.onChange}
                            options={Array.from(publications.values())}
                            getOptionLabel={(option) => option.name}
                            label="publications"
                            placeholder="publication"
                            filterSelectedOptions
                            getOptionSelected={(option, value) => {
                                return option.name === value.name;
                            }}
                            itemValue="name"
                        />
                    </ListItem>
                    : ''}

            </List>
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