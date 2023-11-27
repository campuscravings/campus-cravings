import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Vendor from '../components/Vendor';
import MenuItem from '../components/MenuItem';
import LoadingSpinner from '../components/LoadingSpinner';

/** Regular Users */
const UserHome = () => {
  const { ready, vendors, menuItems } = useTracker(() => {
    // Get access to vendor and menu item documents.
    const subscription = Meteor.subscribe(Vendor.userPublicationName);
    const subscription2 = Meteor.subscribe(MenuItem.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Stuff documents
    const vendorItems = Vendor.collection.find({}).fetch();
    const menuItemItems = MenuItem.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      menuItems: menuItemItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="userhome-page" fluid>
      <Row className="colorBlockBlack">
        <h1>USER WELCOME GRAPHIC (TODO)</h1>
      </Row>
      <Row className="justify-content-center">
        <Col className="colorBlockGreen">
          <h2>Favorite Restaurants</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {vendors.map((vendor, index) => (<Col key={index}><Vendor vendor={vendor} /></Col>))}
          </Row>
        </Col>
        <Col className="colorBlockWhite">
          <h2>Favorite Menu Items</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {menuItems.map((menuItem, index) => (<Col key={index}><MenuItem menuItem={menuItem} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserHome;
