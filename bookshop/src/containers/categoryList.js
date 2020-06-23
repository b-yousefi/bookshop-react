import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid,
    Divider,
    Paper,
    List,
    ListSubheader
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import SubCategory from '../components/subCategoryList';
import { fetchCategories } from '../actions/actions_categories';

import PopperBtn from '../components/popper_button';

class CategoryList extends Component {

    state = {
        popper_open: false
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    onListItemClicked = () => {
        this.setState({ popper_open: false });
    }

    create_category(category, i) {
        const { classes } = this.props;
        return (
            <Grid key={i} item xs>
                <Paper elevation={0} className={classes.paper}>
                    <List
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader className={classes.button} component={NavLink}
                                to={{
                                    pathname: `/categories/${category.id}`,
                                    state: {
                                        categoryId: category.id
                                    }
                                }}
                                style={{ textDecoration: "none" }}
                                id="nested-list-subheader"
                                onClick={this.onListItemClicked} >
                                {category.name}

                            </ListSubheader>
                        }
                        className={classes.root} >
                        <Divider />
                        <SubCategory category={category} onClick={this.onListItemClicked} />
                    </List>
                </Paper>
            </Grid>
        )
    }

    render() {
        //React.forwardRef
        const FancyButton = React.forwardRef((props, ref) => (
            <PopperBtn ref={ref} btnName="Categories" placement='bottom-start' open={this.state.popper_open}>
                {props.children}
            </PopperBtn>
        ));
        const ref = React.createRef();
        if (this.props.categories) {
            return (
                <FancyButton ref={ref}>
                    <div style={{ padding: 4 }}>
                        <Grid container spacing={1} >  {
                            this.props.categories.map((category, i) => {
                                return this.create_category(category, i)
                            })}
                        </Grid>
                    </div>
                </FancyButton>
            );
        } else {
            return "";
        }
    }
}


function mapStateToProps(state) {
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);