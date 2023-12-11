import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profiles/Profiles';
import { Vendors } from '../../api/vendors/Vendors';
import { MenuItems } from '../../api/menuItems/MenuItems';

// publishes only user's profile to user
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

// publishes only the vendor's profile to vendor
Meteor.publish(Profiles.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

// publishes full list of profiles to admin
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// publishes full list of vendors to user
Meteor.publish(Vendors.userPublicationName, function () {
  if (this.userId) {
    return Vendors.collection.find();
  }
  return this.ready();
});

// publishes only the vendor to the vendor
Meteor.publish(Vendors.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.collection.find({ owner: username });
  }
  return this.ready();
});

// publishes full list of vendors to admin
Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Vendors.collection.find();
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(MenuItems.publicationName, function () {
  if (this.userId) {
    return MenuItems.collection.find();
  }
  return this.ready();
});

// publish all users to admin
Meteor.publish(null, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find();
  }
  return this.ready();
});

Meteor.users.allow({
  update(userId) {
    return userId && Roles.userIsInRole(userId, 'admin');
  },
});
