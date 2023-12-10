import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-material';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/*
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      return (<Navigate to="/vendorhome" />);
    }
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (<Navigate to="/adminhome" />);
    }
    return (<Navigate to="/userhome" />);
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center m-4">
        <Col xs={6}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card bg="light" border="success">
              <Card.Body>
                <h4 className="text-center">Register your account</h4>
                <TextField id="signup-form-email" name="email" placeholder="E-mail address" />
                <TextField id="signup-form-email" name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id="signin-form-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="success">
            <p className="text-center">Already have an account? Login <Link to="/signin">here</Link>
            </p>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
