import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { withStyles } from "@material-ui/core/styles";

import PopperCategoryList from "./popper_list_categories";
import PopperLoginForm from "../components/popper_form_login";
import DrawerMenuXS from "./drawer_menu_xs";

import { logoutUser, fetchUser } from "../actions/actions_user";
import { getShoppingCartItemsCount } from "../reducers/selectors";
import PopperShoppingCart from "../components/popper_shopping_cart";
import axios from "axios";

class Menu extends Component {
  state = {
    drawer_open: false,
  };

  componentDidMount() {
    if (this.props.user.isLoggedIn) {
      axios.defaults.headers.common["Authorization"] = this.props.user.token;
      this.props.fetchUser(this.props.user.username);
    }
  }

  onLogout = () => {
    this.props.logoutUser();
  };

  create_tlb_home() {
    return (
      <Button
        color="inherit"
        component={NavLink}
        to="/"
        startIcon={<FontAwesomeIcon icon="book-open" />}
      >
        Bookshop
      </Button>
    );
  }

  create_tlb_user() {
    return (
      this.props.user.isLoggedIn && (
        <Tooltip title={"Profile"} aria-label={"Profile"}>
          <IconButton component={NavLink} to="/user_info" color="inherit">
            <AccountBoxIcon />
          </IconButton>
        </Tooltip>
      )
    );
  }

  create_tlb_shoppingCart() {
    return this.props.user.isLoggedIn ? (
      <PopperShoppingCart badgeContent={this.props.order_items_count} />
    ) : (
      ""
    );
  }

  create_tlb_loginout() {
    const tooltipLabel = this.props.user.isLoggedIn ? "Logout" : "Login";

    return this.props.user.isLoggedIn ? (
      <Tooltip title={tooltipLabel} aria-label={tooltipLabel}>
        <IconButton onClick={this.onLogout} color="inherit">
          <FontAwesomeIcon icon="sign-out-alt" />
        </IconButton>
      </Tooltip>
    ) : (
      <div>
        <Hidden smUp>
          <Tooltip title={tooltipLabel} aria-label={tooltipLabel}>
            <IconButton component={NavLink} to="/login" color="inherit">
              <FontAwesomeIcon icon="sign-in-alt" />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden xsDown>
          <PopperLoginForm />
        </Hidden>
      </div>
    );
  }

  create_tlb_authors() {
    return (
      <Button color="inherit" component={NavLink} to="/authors">
        Authors
      </Button>
    );
  }

  create_tlb_publications() {
    return (
      <Button color="inherit" component={NavLink} to="/publications">
        Publications
      </Button>
    );
  }

  create_about() {
    return (
      <Button color="inherit" component={NavLink} to="/about">
        About
      </Button>
    );
  }

  create_toolbar() {
    const { classes } = this.props;

    return (
      <Toolbar>
        <Hidden smUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown>
          {this.create_tlb_home()}
          <PopperCategoryList classes={classes} />
          {this.create_tlb_authors()}
          {this.create_tlb_publications()}
          {this.create_about()}
        </Hidden>
        <div className={classes.grow} />
        {this.create_tlb_shoppingCart()}
        {this.create_tlb_user()}
        {this.create_tlb_loginout()}
      </Toolbar>
    );
  }

  toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ drawer_open: open });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar position="sticky">{this.create_toolbar()}</AppBar>
        <Hidden mdUp>
          <DrawerMenuXS
            drawer_open={this.state.drawer_open}
            toggleDrawer={this.toggleDrawer}
          />
        </Hidden>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    order_items_count: getShoppingCartItemsCount(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser, fetchUser }, dispatch);
}

const useStyles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Menu));
