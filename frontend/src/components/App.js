import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

import { Container } from "reactstrap"
import JobList from "./JobList";
import Login from "./Login"
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import { Provider } from "react-redux";
import Register from "./Register"
import { createStore } from "redux";
import jobList from "../reducers";

let store = createStore(jobList);
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
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;