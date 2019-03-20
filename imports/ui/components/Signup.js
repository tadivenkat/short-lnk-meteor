import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import Modal from 'react-modal';
import Header from './Header';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      error: null
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    const profile = {
      "firstName": this.refs.firstName.value.trim(),
      "lastName": this.refs.lastName.value.trim()
    }

    if (password.length <= 8) {
      return this.setState({
        error: 'Password must be more than 8 characters long.'
      });
    }
    Accounts.createUser({email, password, profile}, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.setState({
          error: ''
        });
      }
    });
  }

  onCancel = (e) => {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <div>
          <Header title="Join Short Lnk"/>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" name="email" ref="email" placeholder="Email" /><br/>
            <input type="password" name="password" ref="password" placeholder="Password"/><br/>
            <input type="text" name="firstName" ref="firstName" placeholder="First Name"/><br/>
            <input type="text" name="lastName" ref="lastName" placeholder="Last Name"/><br/><br/>
            <input type="submit" value="Create Account"/>
          </form>
          <p>Already have account? <Link to="/">Login here.</Link></p>
      </div>
    );
  }

}
