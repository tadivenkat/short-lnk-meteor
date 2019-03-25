import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import Header from './Header';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      firstName: '',
      lastName: '',
      email: '',
      dob: ''
    }
  }

  componentDidMount() {
    Meteor.call('getLoggedInUserInfo', (err, resp) => {
        if (!!err) {
          this.setState({
              error: err.error
          });
        } else {
          this.setState({
            firstName: resp.profile.firstName,
            lastName: resp.profile.lastName,
            email: resp.emails[0].address,
            dob: String(resp.profile.dob)
          });
        }
    });
  }

  render() {
    var user = null;

    return (
      <div>
          <Header title="Your Profile"/>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <div className="card card-body mb-3">
            <ul className="list-group">
              <li className="list-group-item"><h4>{this.state.firstName}, {this.state.lastName}</h4></li>
              <li className="list-group-item"><h4>{this.state.email}</h4></li>
              <li className="list-group-item"><h4>{this.state.dob}</h4></li>
            </ul>
          </div>
      </div>
    );
  }
}
