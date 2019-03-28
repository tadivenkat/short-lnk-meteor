import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import Header from './Header';

export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  componentDidMount() {
  }

  render() {
    var user = null;

    return (
      <div>
          <Header/>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <h1 className="display-4">About ShortLinks App</h1>
          <p className="lead">An app which stores the links provided by a user.</p>
          <p className="text-secondary">Version 1.0.0</p>
      </div>
    );
  }
}
