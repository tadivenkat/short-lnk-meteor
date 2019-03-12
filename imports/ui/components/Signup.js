import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import Modal from 'react-modal';

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
    if (password.length <= 8) {
      return this.setState({
        error: 'Password must be more than 8 characters long.'
      });
    }
    Accounts.createUser({email, password}, (err) => {
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
          <h1>Join Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" name="email" ref="email" placeholder="Email" />
            <input type="password" name="password" ref="password" placeholder="Password" />
            <input type="submit" value="Create Account"/>
          </form>
          <p>Already have account? <Link to="/">Login here.</Link></p>
          <button onClick={this.onCancel.bind(this)}>Cancel</button>
      </div>
    );
  }

}
