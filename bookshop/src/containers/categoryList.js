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

import SubCategory from '../components/subCategoryList';
import { fetchCategories } from '../actions/actions_categories';

import PopperBtn from '../components/popper_button';

class CategoryList extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    create_category(category, i) {
        const { classes } = this.props;
        return (
            <Grid key={i} item xs>
                <Paper elevation={0} className={classes.paper}>
                    <List
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                {category.name}
                            </ListSubheader>
                        }
                        className={classes.root} >
                        <Divider />
                        <SubCategory category={category} />
                    </List>
                </Paper>
            </Grid>
        )
    }

    render() {
        //React.forwardRef
        const FancyButton = React.forwardRef((props, ref) => (
            <PopperBtn ref={ref} btnName="Categories" placement='bottom-start'>
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