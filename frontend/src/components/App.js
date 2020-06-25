import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import JobForm from "./jobs/JobForm";
import JobList from "./jobs/JobList";
import Login from "./auth/Login"
import Navbar from "./common/Navbar";
import NotFound from "./common/NotFound";
import PrivateRoute from './common/PrivateRoute';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Register from "./auth/Register"
import history from '../history';
import { loadUser } from '../actions/auth';
import store from '../store';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <header>
              <Navbar />
            </header>
            <Switch>
              <Route exact path="/" component={JobList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={JobForm} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;