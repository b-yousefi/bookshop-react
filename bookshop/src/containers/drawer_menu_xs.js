import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Collapse, List, ListItem, ListItemIcon, ListItemText,} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import RoomIcon from '@material-ui/icons/Room';
import ClassIcon from '@material-ui/icons/Class';
import {withStyles} from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {NavLink} from 'react-router-dom';

import SubCategory from '../components/subCategoryList';
import {fetchCategories} from '../actions/actions_categories';
import Divider from "@material-ui/core/Divider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {logoutUser} from "../actions/actions_user";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";


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
            this.setState({selected_category: id});
        } else {
            this.setState({selected_category: null});
        }

    };

    handleClickCategoryList = () => {
        this.setState({open_categoryList: !this.state.open_categoryList});
    };

    onLogout = () => {
        this.props.logoutUser();
    }

    create_category(category) {
        return (
            <div key={category.name}>
                <ListItem
                    component={NavLink}
                    style={{textDecoration: "none"}}
                    to={{
                        pathname: `/categories/${category.id}`,
                    }}
                    onClick={this.handleClickCategoryItem(category.name)}
                >

                    <ListItemText primary={category.name}/>
                    {this.state.selected_category === category.name ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.selected_category === category.name} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <div style={{paddingLeft: 5}}>
                            <SubCategory category={category}/>
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
                        <ListItemIcon><ClassIcon/> </ListItemIcon>
                        <ListItemText primary="Categories"/>
                        {this.state.open_categoryList ? <ExpandLess/> : <ExpandMore/>}
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
        const {classes} = this.props;

        return (
            <SwipeableDrawer
                anchor="left"
                open={this.props.drawer_open}
                onClose={this.props.toggleDrawer(false)}
                onOpen={this.props.toggleDrawer(true)}
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
                            <ListItemIcon><HomeIcon/> </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                        {this.create_categoryList()}
                        <ListItem button color="inherit"
                                  component={NavLink} to="/authors"
                                  onClick={this.props.toggleDrawer(false)}>
                            <ListItemText primary={"Authors"}/>
                        </ListItem>

                        <ListItem button color="inherit"
                                  component={NavLink} to="/publications"
                                  onClick={this.props.toggleDrawer(false)}>
                            <ListItemText primary={"Publications"}/>
                        </ListItem>
                        <ListItem button color="inherit"
                                  component={NavLink} to="/about"
                                  onClick={this.props.toggleDrawer(false)}>
                            <ListItemText primary={"About"}/>
                        </ListItem>
                        {this.props.user.isLoggedIn &&
                        <React.Fragment>
                            <Divider/>
                            <ListItem button color="inherit"
                                      component={NavLink} to="/user_info"
                                      onClick={this.props.toggleDrawer(false)}>
                                <ListItemIcon><PersonIcon/> </ListItemIcon>
                                <ListItemText primary={"Profile"}/>
                            </ListItem>
                            <ListItem button color="inherit"
                                      component={NavLink} to="/user_info/addresses"
                                      onClick={this.props.toggleDrawer(false)}>
                                <ListItemIcon><RoomIcon/> </ListItemIcon>
                                <ListItemText primary={"Addresses"}/>
                            </ListItem>
                            <ListItem button color="inherit"
                                      component={NavLink} to="/user_info/orders"
                                      onClick={this.props.toggleDrawer(false)}>
                                <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
                                <ListItemText primary={"Orders"}/>
                            </ListItem>
                            <ListItem button color="inherit"
                                      onClick={this.onLogout}>
                                <ListItemIcon><FontAwesomeIcon icon="sign-out-alt"/></ListItemIcon>
                                <ListItemText primary={"Logout"}/>
                            </ListItem>
                        </React.Fragment>
                        }
                    </List>
                </div>
            </SwipeableDrawer>
        );

    }
}


function mapStateToProps(state) {
    return {
        categories: state.categories,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchCategories, logoutUser}, dispatch);
}

const useStyles = theme => ({
    drawerPaper: {
        width: "250px",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(DrawerMenuXS));