import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

class MenuUser extends Component {
    state = {
        isLoggedIn: this.props.user.isLoggedIn
    }

    onLoggedIn = (isLoggedIn, username) => {
        this.props.onLoggedIn(isLoggedIn, username);
    }

    onLogout = () => {
        this.props.onLogout();
    }


    static getDerivedStateFromProps(props, state) {
        if (props.user.isLoggedIn !== state.isLoggedIn) {
            return {
                isLoggedIn: props.user.isLoggedIn
            };
        }

        // Return null to indicate no change to state.
        return null;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-menu-red  shadow-sm sticky-top">
                <NavLink className="navbar-brand" exact to='/'>
                    <FontAwesomeIcon icon="book-open" />
                    <span style={{ paddingInlineStart: "5px" }}>Bookshop</span>
                </NavLink>
            </nav>
        );
    }
}


export default MenuUser;