import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import Modal from 'react-modal';
import Header from './Header';
import classnames from 'classnames';
import {validateEmail} from '../../utils/utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dob: new Date()
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {email, password, firstName, lastName, dob, errors} = this.state;
    if (email.trim() === '') {
      this.setState({errors: {email: 'Email can not be empty'}});
      return;
    }
    if (!validateEmail(email)) {
        this.setState({errors: {email: 'Email is invalid'}});
        return;
    }
    if (password.trim() === '') {
      this.setState({errors: {password: 'Password can not be empty'}});
      return;
    }
    if (firstName.trim() === '') {
      this.setState({errors: {firstName: 'First Name can not be empty'}});
      return;
    }
    if (lastName.trim() === '') {
      this.setState({errors: {lastName: 'Last Name can not be empty'}});
      return;
    }

    const profile = {
      "firstName": firstName,
      "lastName": lastName,
      "dob": dob
    }

    if (password.length <= 8) {
      this.setState({
        errors: {password: 'Password must be more than 8 characters long.'}
      });
      return;
    }

    Accounts.createUser({email, password, profile}, (err) => {
      if (err) {
        this.setState({
          errors: {other: err.reason}
        });
      } else {
        this.setState({
          errors: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dob: '',
            other: ''
          }
        });
      }
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEmailFocusOut = (e) => {
    const {email} = this.state;
    if (email.trim() === '') {
      this.setState({errors: {email: 'Email is required'}});
      return;
    }
    if (!validateEmail(email)) {
        this.setState({errors: {email: 'Email is invalid'}});
        return;
    }
    this.setState({errors: {email: ''}});
  }

  onDOBSelect = (date) => {
    this.setState({
      dob: date
    });
    console.log(date);
  }

  render() {
    return (
      <div>
        <Header title="Short Lnk"/>
        <div className="card mb-3">
            <div className="card-header">
              <h3>Join Short Lnk</h3>
            </div>
            <div className="card-body">
              {!!this.state.errors.other ? <p>{this.state.errors.other}</p> : null}
              <form onSubmit={this.onSubmit.bind(this)} noValidate>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    ref="email"
                    value={this.state.email}
                    placeholder="Enter your Email"
                    className={classnames('form-control form-control-lg', {'is-invalid': !!this.state.errors.email})}
                    onChange={this.onChange}
                    onBlur={this.onEmailFocusOut}/>
                  <div className="invalid-feedback">{this.state.errors.email}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    ref="password"
                    value={this.state.password}
                    placeholder="Enter a Password"
                    className={classnames('form-control form-control-lg', {'is-invalid': !!this.state.errors.password})}
                    onChange={this.onChange}/>
                    <div className="invalid-feedback">{this.state.errors.password}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    ref="firstName"
                    value={this.state.firstName}
                    placeholder="Enter your First Name"
                    className={classnames('form-control form-control-lg', {'is-invalid': !!this.state.errors.firstName})}
                    onChange={this.onChange}/>
                    <div className="invalid-feedback">{this.state.errors.firstName}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    ref="lastName"
                    value={this.state.lastName}
                    placeholder="Enter your Last Name"
                    className={classnames('form-control form-control-lg', {'is-invalid': !!this.state.errors.lastName})}
                    onChange={this.onChange}/>
                  <div className="invalid-feedback">{this.state.errors.lastName}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date Of Birth</label>
                  <DatePicker
                    placeholderText="Select your date of birth"
                    selected={this.state.dob}
                    name="dob"
                    ref="dob"
                    className={classnames('form-control form-control-lg', {'is-invalid': !!this.state.errors.dob})}
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date(1900,0, 1)}
                    maxDate={new Date()}
                    dropdownMode="select"
                    onSelect={this.onDOBSelect}/>
                  <div className="invalid-feedback">{this.state.errors.lastName}</div>
                </div>
                <input type="submit" value="Create Account" className="btn btn-light btn-block"/>
              </form>
              <p>Already have account? <Link to="/">Login here.</Link></p>
            </div>
        </div>
      </div>
    );
  }
}
