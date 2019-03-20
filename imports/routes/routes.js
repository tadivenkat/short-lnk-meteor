import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route} from 'react-router-dom';
import Signup from '../ui/components/Signup';
import Link from '../ui/components/Link';
import Login from '../ui/components/Login';
import NotFound from '../ui/components/NotFound';
import history from '../ui/components/history';
import Profile from '../ui/components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const authenticatedPages = ['/links'];
const unAuthenticatedPages = ['/', '/signup'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  console.log('pathname', pathname);
  console.log('isAuthenticated', isAuthenticated);
  const isUnAuthenticatedPage = unAuthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isUnAuthenticatedPage && isAuthenticated) {
    history.push('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/links" component={Link}/>
      <Route path="/profile" component={Profile}/>
      <Route path="*" component={NotFound}/>
    </Switch>
  </Router>
);
