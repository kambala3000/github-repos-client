import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

// components
import Search from './components/Search/';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/search" />
      </Route>

      <Route path="/search" component={Search} />
    </Switch>
  );
};

export default AppRoutes;
