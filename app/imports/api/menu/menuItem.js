import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class MenuItemCollection {
  constructor() {

    this.name = 'MenuItemCollection';

    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      name: String,
      type: String,
      cost: Number,
      available: Boolean,
      restaurant: String,
    }, { tracker: Tracker });

    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const MenuItem = new MenuItemCollection();
