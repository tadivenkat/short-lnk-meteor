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
            dob: String(resp.profile.dob),
            address: resp.profile.address,
            city: resp.profile.city,
            state: resp.profile.state,
            pincode: resp.profile.pincode,
            subscribeTextMessages: resp.profile.subscribeTextMessages
          });
        }
    });
  }

  render() {
    var user = null;

    return (
      <div>
          <Header/>
          <h1 className="display-4">Your Profile</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <div className="card card-body mb-3">
            <ul className="list-group">
              <li className="list-group-item"><h4>{this.state.firstName}, {this.state.lastName}</h4></li>
              <li className="list-group-item"><h4>{this.state.email}</h4></li>
              <li className="list-group-item"><h4>{this.state.dob}</h4></li>
              <li className="list-group-item"><h4>{this.state.address}</h4></li>
              <li className="list-group-item"><h4>{this.state.city}</h4></li>
              <li className="list-group-item"><h4>{this.state.state}</h4></li>
              <li className="list-group-item"><h4>{this.state.pincode}</h4></li>
              <li className="list-group-item"><h4>subscribeTextMessages: {this.state.subscribeTextMessages ? "yes" : "no"}</h4></li>
            </ul>
          </div>
      </div>
    );
  }
}
