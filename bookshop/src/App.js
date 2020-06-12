import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCheckSquare, faCoffee, faStar, faEdit, faTrash, faFilm, faBook, faBookOpen,
  faSignInAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faEye, faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

import './App.css';
import Menubar from './containers/menu';
import { Container } from '@material-ui/core';


library.add(fab, faCheckSquare, faCoffee, faStar, faEdit, faTrash, faFilm, faBook, faBookOpen,
  faSignInAlt, faUser, faSignOutAlt, faChevronLeft, faBars, faEye, faEyeSlash)



const useStyles = theme => ({
  root: {
  },
  heading: {
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightRegular
  }
});


class App extends Component {

  Views = {
    Home: 'Home',
    UserProfile: 'User'
  };

  render() {
    return (
      <div container="true" className={this.props.classes.root}>

        <div>
          <h1 className="darkblue">
            <span>This is just a sample website view source code at <a href="https://github.com/b-yousefi/SampleProject">github</a> </span>
          </h1>
        </div>
        <Menubar />
        <Container>
          <h1>Home</h1>
        </Container>
      </div>
    );
  }
}


export default withStyles(useStyles)(App);
