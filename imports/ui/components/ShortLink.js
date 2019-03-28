import React from 'react';
import {createBrowserHistory} from 'history';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router-dom';
import history from './history';
import {Links} from '../../api/links';

export default class ShortLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      links: []
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.call('getLinksList', (err, resp) => {
          if (!err) {
            this.setState({
              links: resp
            });
          }
      });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  onLogout = (e) => {
      Meteor.logout((err)=> {
        if (err) {
          this.setState({
            error: err
          });
        } else {
          this.setState({
            error: ''
          });
          history.push('/');
        }
      });
  }

  onSubmit = (e) => {
      e.preventDefault();
      Meteor.call('createLink', this.refs.url.value.trim(), (err, resp) => {
        if (err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.setState({
            error: ''
          });
          this.refs.url.value = '';
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Short Lnks</h1>
        {this.state.error ? <p>{this.state.error}</p> : null}
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="Enter a URL"/>
        </form>
        <p>Links</p>
        {this.state.links.map((link) => <p key={link._id}>{link.url}</p>)}
        <p><Link to="/profile">View your profile</Link></p>
      </div>
    );
  }

}
