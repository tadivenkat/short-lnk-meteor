import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {onAuthChange, routes} from '../imports/routes/routes';
import {Session} from 'meteor/session';
import 'bootstrap/dist/css/bootstrap.min.css';

Session.set('name', 'Amma, Naanna');
console.log(Session.get('name'));

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup( function() {
  ReactDOM.render(routes, document.getElementById('root'));
});
