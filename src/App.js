import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import MessageForm from './MessageForm'
import InvitesView from './InvitesView'
import Login from './auth/Login'
import AuthButton from './auth/AuthButton'
import PrivateRoute from './auth/PrivateRoute'
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/send_message">Send Email</Link>
            </li>
            <li>
              <Link to="/invites">Invites</Link>
            </li>
          </ul>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/send_message" component={MessageForm} />
          <PrivateRoute path="/invites" component={InvitesView} />
        </div>
      </Router>
    );
  }
}

export default App;
