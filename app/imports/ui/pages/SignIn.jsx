import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-material';

/*
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      return (<Navigate to="/vendorhome" />);
    }
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (<Navigate to="/adminhome" />);
    }
    return (<Navigate to="/userhome" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signin-page" className="py-3">
      <Row className="justify-content-center m-4">
        <Col xs={6}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card bg="light" border="success">
              <Card.Body>
                <h4 className="text-center">Log In</h4>
                <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id="signin-form-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="success">
            <p className="text-center">Don&apos;t have an account? Sign up<Link to="/signup"> here</Link></p>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
