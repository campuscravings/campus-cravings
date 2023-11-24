import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'; // Import Tracker from Meteor
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = () => {
      const user = Meteor.user();
      const userProfileSubscription = Meteor.subscribe(Profiles.userPublicationName);

      if (user && userProfileSubscription.ready()) {
        const userProfile = Profiles.collection.findOne({ user: user.username });
        setProfile(userProfile);
        setLoading(false);
      }
    };

    fetchUserProfile();

    const userObserver = Tracker.autorun(() => {
      fetchUserProfile();
    });

    return () => {
      userObserver.stop();
    };
  }, []);

  if (!profile) {
    return (
      <Container id="profile-page" className="py-3">
        <Card className="text-center">
          <Card.Body className="p-4">
            <Card.Title><h1>Profile Not Found</h1></Card.Title>
            <Link to="/userprofile">Create User Profile</Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Container id="profile-page" className="py-3">
      <Card className="text-center">
        <Card.Body className="p-4">
          <Card.Title><h1>My Profile</h1></Card.Title>
          <Row>
            <Col xs={12} className="text-right mb-4">
              <Image
                id="profile-image"
                src={profile.image}
                width={300}
                roundedCircle
                style={{ border: '2px solid #ccc' }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3 id="profile-name" className="text-center mb-4">{profile.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className="border p-3">
                <h5>Bio:</h5>
                <p id="profile-bio" className="mt-3">{profile.bio}</p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="border p-3">
                <h5>Favorite Foods:</h5>
                <p id="profile-foods">{profile.foods.join(', ')}</p>
              </div>
            </Col>
          </Row>
          <Link to="/userprofile">Edit User Profile</Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
