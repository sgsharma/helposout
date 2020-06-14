import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from "react-redux";
import React, { Component } from 'react';
import { applyMiddleware, createStore } from "redux";

import JobForm from "./JobForm";
import JobList from "./JobList";
import { LOGIN_SUCCESSFUL } from '../actions/auth';
import Login from "./Login"
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import Register from "./Register"
import RequireAuth from './require_auth';
import jobList from "../reducers";
import thunk from "redux-thunk";

let store = createStore(jobList, applyMiddleware(thunk));

// Check for token and update application state if required
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: 'LOGIN_SUCCESSFUL' });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <header>
              <Navbar />
            </header>
            <Switch>
              <Route exact path="/" component={JobList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={RequireAuth(JobForm)} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;