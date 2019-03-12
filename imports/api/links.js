import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', () => {
    Links.find().fetch();
  });
}

Meteor.methods({
  getLinksList() {
    if (!this.userId) {
      // The user is not logged-in
      throw new Meteor.Error('not-authorized');
    }
    return Links.find({userId: this.userId}).fetch();
  },
  createLink(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // Validate the url before inserting into database
    const context = new SimpleSchema({
      url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url
      }
    }).newContext();
    context.validate({
      url: url
    });
    if (!context.isValid()) {
      throw new Meteor.Error(400, "Please enter valid Url.");
    }
    Links.insert({
        url: url,
        userId: this.userId
    });
  }
});
