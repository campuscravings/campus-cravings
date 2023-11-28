import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendors/Vendors.js';
import { MenuItems } from '../../api/menuItems/MenuItems.js';
import Vendor from '../components/Vendor';
import MenuItem from '../components/MenuItem';
import LoadingSpinner from '../components/LoadingSpinner';

/** Regular Users */
const UserHome = () => {
  const { ready, vendors, menuItems } = useTracker(() => {
    // Get access to vendor and menu item documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    const subscription2 = Meteor.subscribe(MenuItems.publicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the vendor and menu item documents
    const vendorItems = Vendors.collection.find({}).fetch();
    const menuItemItems = MenuItems.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      menuItems: menuItemItems,
      ready: rdy,
    };
  }, []);

  if (menuItems.length === 0 && vendors.length === 0) {
    return (
      <Container id="userhome-page" fluid>
        <div className="ckH">Welcome to Campus Cravings</div>
        <Image
          fluid
          src="../../images/campus-center.png"
        />
        <Row className="justify-content-center">
          <Col className="colorBlockGreen">
            <h2>Favorite Restaurants</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h5>No vendors available</h5>
            </Row>
          </Col>
          <Col className="colorBlockWhite">
            <h2>Favorite Menu Items</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h5>No menu items available</h5>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  } if (menuItems.length === 0) {
    return (<div>No menu items available</div>);
  } if (vendors.length === 0) {
    return (
      <Container id="userhome-page" fluid>
        <div className="ckH">Welcome to Campus Cravings</div>
        <Image
          fluid
          src="../../images/campus-center.png"
        />
        <Row className="justify-content-center">
          <Col className="colorBlockGreen">
            <h2>Favorite Restaurants</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h5>No vendors available</h5>
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
    );
  }

  return (ready ? (
    <Container id="userhome-page" fluid>
      <h1>Welcome to Campus Cravings</h1>
      <Image
        fluid
        src="../../images/campus-center.png"
      />
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
