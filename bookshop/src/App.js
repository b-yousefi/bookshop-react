import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route,} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
    faBars,
    faBook,
    faBookOpen,
    faCheckSquare,
    faChevronLeft,
    faCoffee,
    faEdit,
    faEye,
    faEyeSlash,
    faFilm,
    faLink,
    faSignInAlt,
    faSignOutAlt,
    faStar,
    faTimes,
    faTrash,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import {withStyles} from '@material-ui/core/styles';

import {Container,} from '@material-ui/core';


import './App.css';
import Home from './containers/home';
import BookList from './containers/list_books';
import BookContent from './containers/content_book';
import Menu from './containers/menu';
import UserForm from './containers/form_user';
import CategoryListContent from './containers/content_CategoryList';
import AuthorList from './containers/list_authors';
import PublicationList from '././containers/list_publication'
import TransitionAlerts from './components/TransitionAlerts';
import LoginForm from './containers/form_login';

import {clearNotif} from './actions/actions';
import {fetchAuthors} from './actions/action_authors';
import {fetchPublications} from './actions/actions_publicaion';

library.add(fab, faCheckSquare, faCoffee, faStar, faEdit, faTrash, faFilm, faBook, faBookOpen,
    faSignInAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faEye, faEyeSlash, faTimes, faLink)


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

    componentDidMount() {
        this.props.fetchPublications();
        this.props.fetchAuthors();
    }

    create_notification_bar() {
        return (
            this.props.notification ?
                <TransitionAlerts title={this.props.notification.message ? this.props.notification.message : 'error'}
                                  message={this.props.notification.errors ?
                                      this.props.notification.errors.map((error, i) => {
                                          return (
                                              <div key={i}>
                                                  {error.error}
                                                  <br/>
                                              </div>)
                                      }) : ''
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

                    {/* <div>
            <h4 className="darkblue">
              <span>This is just a sample website view source code at <a href="https://github.com/b-yousefi/SampleProject">github</a> </span>
            </h4>
          </div> */}
                    <Menu/>
                    {this.create_notification_bar()}
                    <Container style={{marginTop: 24}} maxWidth={false}>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    <Redirect to="/home"/>
                                )
                            }}
                        />
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/books" component={BookList}/>
                        <Route exact path="/books/:id" component={BookContent}/>
                        <Route path="/authors" component={AuthorList}/>
                        <Route path="/publications" component={PublicationList}/>
                        <Route path="/user" component={UserForm} exact={true}/>
                        <Route path="/categories/:id" component={CategoryListContent}/>
                        <Route path="/login" component={LoginForm}/>
                    </Container>

                </div>
            </BrowserRouter>

        );
    }
}

function mapStateToProps(state) {
    return {
        notification: state.notification,
        filter: state.filter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({clearNotif, fetchAuthors, fetchPublications}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(App));
