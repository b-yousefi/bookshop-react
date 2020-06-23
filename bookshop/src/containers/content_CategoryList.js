import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Paper,
    List,
    Divider,
    Typography,
    Breadcrumbs,
    Grid,
    ListSubheader,
} from '@material-ui/core';

import SubCategory from '../components/subCategoryList';
import { makeGetCategory } from '../reducers/selectors';
import CategoryLink from './link_category';


class CategoryListContent extends Component {

    create_breadcrumbs() {
        var parentArr = this.props.category.parent.split('&');
        return (
            <Breadcrumbs aria-label="breadcrumb" background-color="green">
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


                    <Grid item xs={4} md={2}>
                        {this.props.category.subCategories && this.props.category.subCategories.length > 0 ?
                            <Paper>
                                <List component="nav">
                                    <ListSubheader>
                                        SubCategories
                                    </ListSubheader>
                                    <SubCategory category={this.props.category} />
                                </List>
                            </Paper> : ""
                        }
                    </Grid>

                    <Grid item xs={6} md={8} >
                        <Paper style={{ padding: 16 }}>
                            {this.create_breadcrumbs()}
                            <Typography variant="h4" gutterBottom>
                                {this.props.category.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {this.props.category.description}
                            </Typography>
                            <Divider />

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
        category: getCategory(state, props.location.state.categoryId)
    }
}

export default connect(mapStateToProps, null)(CategoryListContent);