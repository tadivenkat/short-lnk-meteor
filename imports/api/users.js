import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  const context = new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).newContext();
  context.validate({
    email: email
  });
  if (!context.isValid()) {
    throw new Meteor.Error(400, "Please enter valid email address.");
  }
  return true;
});

Meteor.methods({
    getLoggedInUserInfo() {
      if (!this.userId) {
        // The user is not logged-in
        throw new Meteor.Error('not-authorized');
      }
      return Meteor.user();
    }
});
