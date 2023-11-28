import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class MenuItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MenuItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the schema for menu items
    this.schema = new SimpleSchema({
      name: String,
      vendor: String,
      image: {
        type: String,
        optional: true,
      },
      description: {
        type: String,
      },
      cost: {
        type: Number,
      },
      vegan: {
        type: Boolean,
        optional: true,
      },
      available: {
        type: Boolean,
      },
      calories: {
        type: Number,
        optional: true,
      },
    });
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.publicationName = `${this.name}.publication`;
  }
}

export const MenuItems = new MenuItemsCollection();
