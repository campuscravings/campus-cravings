import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vendors } from '../../api/vendors/Vendors';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  address: String,
  description: String,
  hours: String,
  tags: [String],
  menu: [String],
  logo: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddVendors page for adding a document. */
const AddVendor = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, address, description, hours, tags, menu, logo } = data;
    const owner = Meteor.user().username;
    Vendors.collection.insert(
      { name, address, description, hours, tags, menu, owner, logo },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="addvendor-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Vendors</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="address" /></Col>
                </Row>
                <LongTextField name="description" />
                <Row>
                  <Col><TextField name="hours" /></Col>
                  <Col><TextField name="tags" /></Col>
                </Row>
                <LongTextField name="menu" />
                <LongTextField name="logo" />
                <SubmitField />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddVendor;
