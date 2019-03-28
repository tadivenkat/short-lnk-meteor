import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import Modal from 'react-modal';
import Header from './Header';
import classnames from 'classnames';
import {validateEmail} from '../../utils/utils';
import {states, cities} from '../../utils/utils';
import Select from 'react-select';
import Switch from 'react-switch';
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
      dob: new Date(),
      address: '',
      city: null,
      state: null,
      pincode: '',
      states: states,
      cities: cities,
      subscribeTextMessages: true
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {email, password, firstName, lastName, dob, address, city, state, pincode, subscribeTextMessages, errors} = this.state;
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
      "dob": dob,
      "address": address,
      "city": city.value,
      "state": state.value,
      "pincode": pincode,
      "subscribeTextMessages": subscribeTextMessages
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
  }

  onStateChange = (selectedState) => {
    if (this.state.state === null || this.state.state.value !== selectedState.value) {
      this.setState({
        city: [],
        state: selectedState,
        cities: cities.filter(city => city.state === selectedState.value)
      });
    }
  }

  onCityChange = (selectedCity) => {
    this.setState({
      city: selectedCity
    });
  }

  onSubscribeTextMessagesChange = (subscribeTextMessages) => {
    this.setState({subscribeTextMessages});
  }

  render() {
    return (
      <div>
        <Header/>
        <h1 className="display-4">Signup for ShortLink</h1>
        <div className="container">
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
                  {" "}
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
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    rows="4"
                    cols="100"
                    name="address"
                    ref="address"
                    value={this.state.address}
                    placeholder="Enter your address"
                    className={classnames('form-control form-control-lg', {'is-invalid': !!this.state.errors.address})}
                    onChange={this.onChange}/>
                  <div className="invalid-feedback">{this.state.errors.address}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <Select
                    options={this.state.states}
                    value={this.state.state}
                    name="state"
                    placeholder="Select your state"
                    isSearchable={true}
                    isClearable={true}
                    className={classnames('basic-single', {'is-invalid': !!this.state.errors.state})}
                    classNamePrefix="select"
                    onChange={this.onStateChange}/>
                  <div className="invalid-feedback">{this.state.errors.state}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Select
                    options={this.state.cities}
                    value={this.state.city}
                    name="city"
                    placeholder="Select your city"
                    isSearchable={true}
                    isClearable={true}
                    className={classnames('basic-single', {'is-invalid': !!this.state.errors.state})}
                    classNamePrefix="select"
                    onChange={this.onCityChange}/>
                  <div className="invalid-feedback">{this.state.errors.city}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    ref="pincode"
                    value={this.state.pincode}
                    placeholder="Enter Pincode"
                    className={classnames('form-control form-control-lg', {'is-invalid': !!this.state.errors.pincode})}
                    onChange={this.onChange}/>
                    <div className="invalid-feedback">{this.state.errors.pincode}</div>
                </div>
                <div className="form-group">
                  <label>
                    <span>Do you want to subscribe to text messages? </span>
                    {" "}
                    <Switch
                      checked={this.state.subscribeTextMessages}
                      name="subscribeTextMessages"
                      onChange={this.onSubscribeTextMessagesChange}/>
                  </label>
                </div>
                <input type="submit" value="Create Account" className="btn btn-light btn-block"/>
              </form>
              <p>Already have account? <Link to="/">Login here.</Link></p>
            </div>
        </div>
        </div>
      </div>
    );
  }
}
