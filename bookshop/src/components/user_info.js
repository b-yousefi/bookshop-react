import React, {Component, Fragment} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Link, Route, Switch} from "react-router-dom";
import AddressList from '../containers/list_address';
import OrderList from '../containers/list_order';
import UserForm from '../containers/form_user';
import {withStyles} from "@material-ui/core/styles";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
});


class UserInfo extends Component {

    getValue = (location) => {
        if (location.startsWith("/user_info/addresses")) {
            return "/user_info/addresses";
        } else if (location.startsWith("/user_info/orders")) {
            return "/user_info/orders";
        }
        return location;

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Route
                    path="/user_info"
                    render={({location}) => (
                        <Fragment>
                            <Tabs value={this.getValue(location.pathname)} variant="fullWidth"
                                  className={classes.root}
                                  indicatorColor="secondary"
                                  textColor="secondary"
                            >
                                <Tab value={"/user_info"} label="Profile" component={Link} to="/user_info"/>

                                <Tab value={"/user_info/addresses"} label="Addresses" component={Link}
                                     to="/user_info/addresses"/>
                                <Tab value={"/user_info/orders"} label="Orders" component={Link}
                                     to="/user_info/orders"/>
                            </Tabs>
                            <Switch>
                                <Route exact={true} path="/user_info" component={UserForm}/>
                                <Route path="/user_info/addresses" component={AddressList}/>
                                <Route path="/user_info/orders" component={OrderList}/>
                            </Switch>
                        </Fragment>
                    )}
                />
            </div>
        );
    }
}

export default (withStyles(useStyles)(UserInfo));
