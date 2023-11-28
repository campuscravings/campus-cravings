import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, BoolField, NumField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Roles } from 'meteor/alanning:roles';
import { MenuItems } from '../../api/menuItem/MenuItem';
import LoadingSpinner from '../components/LoadingSpinner';

const formSchema = new SimpleSchema({
  name: { type: String },
  vendor: { type: String },
  image: { type: String, optional: true },
  description: { type: String },
  cost: { type: Number },
  vegan: { type: Boolean, optional: true },
  available: { type: Boolean },
  calories: { type: Number, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddMenuItem = () => {

  const user = Meteor.user();

  if (!Roles.userIsInRole(user, ['vendor', 'admin'])) {
    return <h2 className="text-center">You do not have permission to access this page.</h2>;
  }

  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(MenuItems.publicationName);
    const rdy = subscription.ready();

    let document = null;
    if (rdy) {
      document = MenuItems.collection.findOne(_id);
    }

    // console.log('Ready:', rdy); // Check subscription readiness
    // console.log('Document:', document); // Check the fetched document

    return { doc: document, ready: rdy };
  }, [_id]);

  const submit = (data) => {
    const { name, vendor, image, description, cost, vegan, available, calories } = data;

    const MenuItemData = {
      name,
      vendor,
      image,
      description,
      cost,
      vegan,
      available,
      calories,
    };

    // console.log('MenuItemData:', MenuItemData);
    // console.log('name:', name);
    // console.log('vendor:', vendor);

    const existingMenuItem = MenuItems.collection.findOne({
      name: name.trim(),
      vendor: vendor.trim(),
    });

    if (existingMenuItem && existingMenuItem._id !== _id) {
      // Update the existing menu item
      MenuItems.collection.update(
        { _id: existingMenuItem._id },
        { $set: MenuItemData },
        (error) => {
          if (error) {
            // console.error('Update error:', error);
            swal('Error', error.message, 'error');
          } else {
            // console.log('Menu item updated successfully');
            swal('Success', 'Menu item updated successfully', 'success');
          }
        },
      );
    } else if (!existingMenuItem) {
      // Insert a new menu item
      MenuItems.collection.insert(MenuItemData, (error) => {
        if (error) {
          // console.error('Insert error:', error);
          swal('Error', error.message, 'error');
        } else {
          // console.log('New menu item created successfully');
          swal('Success', 'New menu item created successfully', 'success');
        }
      });
    }

  };
  return ready ? (
    <Container id="add-menu-item-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Menu Item</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={submit} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={12}>
                    <TextField id="add-menu-item-field-name" name="name" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <TextField id="add-menu-item-field-vendor" name="vendor" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <TextField id="add-menu-item-field-image" name="image" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <TextField id="add-menu-item-field-description" name="description" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <TextField id="add-menu-item-field-cost" name="cost" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <BoolField id="add-menu-item-field-vegan" name="vegan" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <BoolField id="add-menu-item-field-available" name="available" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <NumField id="add-menu-item-field-calories" name="calories" showInlineError />
                  </Col>
                </Row>
                <SubmitField id="add-menu-item-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};
export default AddMenuItem;
