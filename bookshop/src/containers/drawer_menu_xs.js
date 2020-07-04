import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Drawer,
    ListItemIcon,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import { withStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { NavLink } from 'react-router-dom';

import SubCategory from '../components/subCategoryList';
import { fetchCategories } from '../actions/actions_categories';


class DrawerMenuXS extends Component {

    state = {
        selected_category: null,
        open_categoryList: false,
    }

    componentDidMount() {
        this.props.fetchCategories();
    }


    handleClickCategoryItem = id => () => {
        if (this.state.selected_category === null || this.state.selected_category !== id) {
            this.setState({ selected_category: id });
        } else {
            this.setState({ selected_category: null });
        }

    };

    handleClickCategoryList = () => {
        this.setState({ open_categoryList: !this.state.open_categoryList });
    };

    create_category(category) {
        return (
            <div key={category.name} >
                <ListItem
                    component={NavLink}
                    style={{ textDecoration: "none" }}
                    to={{
                        pathname: `/categories/${category.id}`,
                    }}
                    onClick={this.handleClickCategoryItem(category.name)}
                >

                    <ListItemText primary={category.name} />
                    {this.state.selected_category === category.name ? <ExpandLess /> : <ExpandMore />}
                </ListItem >
                <Collapse in={this.state.selected_category === category.name} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <div style={{ paddingLeft: 5 }}>
                            <SubCategory category={category} />
                        </div>
                    </List>
                </Collapse>
            </div>
        )
    }
    create_categoryList() {
        if (this.props.categories) {
            return (
                <div>
                    <ListItem button
                        onClick={this.handleClickCategoryList}
                    >
                        <ListItemIcon><ClassIcon /> </ListItemIcon>
                        <ListItemText primary="Categories" />
                        {this.state.open_categoryList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open_categoryList} timeout="auto" unmountOnExit>
                        <List
                            component="nav"
                        >  {
                                this.props.categories.map((category) => {
                                    return this.create_category(category)
                                })}
                        </List>
                    </Collapse>
                </div>
            )
        } else {
            return "";
        }
    }
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                anchor="left"
                open={this.props.drawer_open}
                onClose={this.props.toggleDrawer(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div
                    role="presentation"
                    onKeyDown={this.props.toggleDrawer(false)}
                >
                    <List>
                        <ListItem button
                            color="inherit"
                            component={NavLink} to="/"
                            onClick={this.props.toggleDrawer(false)}>
                            <ListItemIcon><HomeIcon /> </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        {this.create_categoryList()}
                        <ListItem button color="inherit"
                            component={NavLink} to="/authors"
                            onClick={this.props.toggleDrawer(false)}>
                            <ListItemText primary={"Authors"} />
                        </ListItem>

                        <ListItem button color="inherit"
                            component={NavLink} to="/publications"
                            onClick={this.props.toggleDrawer(false)}>
                            <ListItemText primary={"Publications"} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        );

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

const useStyles = theme => ({
    drawerPaper: {
        width: "250px",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(DrawerMenuXS));