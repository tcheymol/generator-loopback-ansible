import React from 'react';
import { IndexRoute, Route } from 'react-router';

import RootContainer from './containers/root';
import HomeViewContainer from './containers/home-view';
import PageContainer from './containers/page';

const routes = (
  <Route path="/" component={RootContainer}>
    <IndexRoute component={HomeViewContainer} />
    <Route component={PageContainer} path="/page" />
  </Route>
);

export default routes;
