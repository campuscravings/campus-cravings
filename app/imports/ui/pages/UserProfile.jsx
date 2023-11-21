import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';

const formSchema = new SimpleSchema({
  name: String,
  bio: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  foods: {
    type: Array,
  },
  'foods.$': {
    type: String,
    allowedValues: ['Breakfast', 'Lunch', 'Dinner'], // Modify the allowed values as needed
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the EditStuff page for editing a single document. */
const UserProfile = () => {
  const { _id } = useParams();

  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();

    let document = null;
    if (rdy) {
      document = Profiles.collection.findOne(_id);
    }

    return { doc: document, ready: rdy };
  });
  const submit = (data) => {
    const { name, bio, image, foods } = data;
    const loggedInUser = Meteor.user();
    const user = loggedInUser.username;
    console.log('loggedInUser:', loggedInUser);
    console.log('user:', user);

    const existingProfile = Profiles.collection.findOne({ user });
    console.log('existingProfile:', existingProfile);

    const profileData = { name, bio, image, foods, user };

    if (existingProfile) {
      Profiles.collection.update(
        { _id: existingProfile._id }, // Specify the document by its _id
        { $set: profileData },
        (error) => {
          if (error) {
            console.error('Update error:', error);
            swal('Error', error.message, 'error');
          } else {
            console.log('Profile updated successfully');
            swal('Success', 'Profile updated successfully', 'success');
          }
        },
      );
    } else {
      // For a new profile, perform an insert
      Profiles.collection.insert(profileData, (error) => {
        if (error) {
          console.error('Insert error:', error);
          swal('Error', error.message, 'error');
        } else {
          console.log('New profile created successfully');
          swal('Success', 'New profile created successfully', 'success');
        }
      });
    }
  };
  return ready ? (
    <Container id="userprofile-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>User Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}>
                    <TextField name="name" showInlineError />
                  </Col>
                  <Col xs={6}>
                    <TextField name="image" showInlineError />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <TextField name="bio" showInlineError />
                  </Col>
                  <Col xs={12}>
                    <SelectField name="foods" showInlineError multiple />
                  </Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default UserProfile;
