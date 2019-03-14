import React from 'react';
import {Link} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import history from './history';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  onSubmit = (e) => {
      e.preventDefault();
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      Meteor.loginWithPassword({email}, password, (err) => {
        if (err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.setState({
            error: ''
          });
          history.push('/links');
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Login to Short Link</h1>
        {this.state.error ? <p>{this.state.error}</p> : null}
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" name="email" ref="email" placeholder="Email" />
          <input type="password" name="password" ref="password" placeholder="Password" />
          <input type="submit" value="Login"/>
        </form>
        <p>Do not have account? <Link to="/signup">Signup here</Link></p>
      </div>
    );
  }
}
