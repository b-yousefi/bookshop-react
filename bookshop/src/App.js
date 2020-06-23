import React, { Component } from 'react';
import {
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCheckSquare, faCoffee, faStar, faEdit, faTrash, faFilm, faBook, faBookOpen,
  faSignInAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faEye, faEyeSlash, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

import {
  Container,
} from '@material-ui/core';


import './App.css';
import Content from './containers/Home';
import Menu from './containers/menu';
import UserForm from './containers/form_user';
import CategoryListContent from './containers/content_CategoryList';
import AuthorList from './containers/list_authors';
import TransitionAlerts from './components/TransitionAlerts';
import { clearNotif } from './actions/actions';

library.add(fab, faCheckSquare, faCoffee, faStar, faEdit, faTrash, faFilm, faBook, faBookOpen,
  faSignInAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faEye, faEyeSlash, faTimes)



const useStyles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightRegular
  },
});


class App extends Component {

  Views = {
    Home: 'Home',
    UserProfile: 'User'
  };

  create_notifiaction_bar() {
    return (
      this.props.notification ?
        <TransitionAlerts title={this.props.notification.message ? this.props.notification.message : 'error'}
          message={this.props.notification.errors ?
            this.props.notification.errors.map((error, i) => {
              return (
                <div key={i}>
                  {error.error}
                  <br />
                </div>)
            }) : 'Some error occurred!!!!'
          }
          severity={this.props.notification.severity} open={this.props.notification !== null}
          onClick={() => {
            this.props.clearNotif();
          }}
        /> : ''
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div container="true" className={this.props.classes.root}>

          <div>
            <h1 className="darkblue">
              <span>This is just a sample website view source code at <a href="https://github.com/b-yousefi/SampleProject">github</a> </span>
            </h1>
          </div>
          <Menu />
          {this.create_notifiaction_bar()}
          <Container style={{ marginTop: 24 }} maxWidth={false}>
            <Route path="/" component={Content} exact={true} />
            <Route path="/authors" component={AuthorList} />
            <Route path="/user" component={UserForm} exact={true} />
            <Route path="/categories/:id" component={CategoryListContent} />
          </Container>

        </div>
      </BrowserRouter>

    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearNotif }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(App));
