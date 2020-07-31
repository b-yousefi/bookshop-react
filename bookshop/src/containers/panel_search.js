import React, {Component} from 'react';
import CheckboxesTags from '../components/CheckboxesTags';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Hidden, List, ListItem,} from '@material-ui/core';

import {setFilter} from '../actions/actions_filter';
import {filterBooks} from '../actions/actions_book';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {withStyles} from "@material-ui/core/styles";


class SearchPanel extends Component {

    state = {
        filter: this.props.filter,
        expanded: false,
    }

    static getDerivedStateFromProps(props, state) {
        return {
            filter: props.filter,
        };
    }

    onChange = (name, newValue) => {
        let filter = this.state.filter;
        filter[name] = newValue;
        this.setState({filter});
        this.props.setFilter(this.state.filter);
        this.props.filterBooks();
    }

    toggleAccordion = () => {
        this.setState({expanded: !this.state.expanded})
    }

    create_filter_list() {
        const {categories, authors, publications} = this.props;
        const {categoryIds, authorIds, publicationIds} = this.state.filter;
        return (
            <List style={{width: "100%"}}>
                {categories && !this.props.hideCategoryFilter ?
                    <ListItem>
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
        );
    }

    render() {
        return (
            <React.Fragment>
                <Hidden mdUp>
                    <Accordion expanded={this.state.expanded} onChange={this.toggleAccordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{color: "white"}}/>}
                            id="panel1a-header"
                            style={{backgroundColor: "#5f26b5", color: "white"}}>
                            <Typography style={{color: "white"}}>Filters</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{padding: 5}}>
                            {this.create_filter_list()}
                        </AccordionDetails>
                    </Accordion>
                </Hidden>
                <Hidden smDown>
                    <Accordion expanded={true}>
                        <AccordionSummary
                            id="panel1a-header"
                            style={{backgroundColor: "#5f26b5", color: "white"}}>
                            <Typography style={{color: "white"}}>Filters</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{padding: 5}}>
                            {this.create_filter_list()}
                        </AccordionDetails>
                    </Accordion>
                </Hidden>
            </React.Fragment>
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
    return bindActionCreators({setFilter, filterBooks}, dispatch);
}

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SearchPanel));