import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import JobList from "./JobList";
import NotFound from "./NotFound";

class App extends Component {
  render() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={JobList} />
      <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
  );
  }
}

export default App;