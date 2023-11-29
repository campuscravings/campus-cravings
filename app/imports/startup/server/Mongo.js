import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendors/Vendors.js';
import { Profiles } from '../../api/profiles/Profiles.js';
import { MenuItems } from '../../api/menuItems/MenuItems';

/* eslint-disable no-console */

const addProfile = (profile) => {
  console.log(`  Adding: ${profile.name} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
  }
}

const addVendor = (vendor) => {
  console.log(`  Adding: ${vendor.name} (${vendor.owner})`);
  Vendors.collection.insert(vendor);
};

// Initialize the VendorsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendors.');
    Meteor.settings.defaultVendors.forEach(vendor => addVendor(vendor));
  }
}
const addMenuItem = (menuItem) => {
  console.log(`  Adding menu item: ${menuItem.name} (${menuItem.owner})`);
  MenuItems.collection.insert(menuItem);
};

// Initialize the MenuItems collection if empty
if (MenuItems.collection.find().count() === 0) {
  if (Meteor.settings.defaultMenuItems) {
    console.log('Creating default menu items.');
    Meteor.settings.defaultMenuItems.forEach(menuItem => addMenuItem(menuItem));
  }
}
