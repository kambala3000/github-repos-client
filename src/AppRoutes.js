import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

// components
import Search from './components/Search';
import Repository from './components/Repository';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/search" />
      </Route>

      <Route path="/search" component={Search} />
      <Route path="/repository/:id" component={Repository} />
    </Switch>
  );
};

export default AppRoutes;
