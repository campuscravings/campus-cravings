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

  // if menuItem and vendor collections are empty
  if (menuItems.length === 0 && vendors.length === 0) {
    return (ready ? (
      <Container id="userhome-page" fluid>
        <div className="ckH">Welcome to Campus Cravings</div>
        <Image
          fluid
          src="../../images/campus-center.png"
        />
        <Row className="colorBlockGreen justify-content-center">
          <Col>
            <h2>Favorite Restaurants</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h5>No vendors available</h5>
            </Row>
          </Col>
          <Col>
            <h2>Favorite Menu Items</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h5>No menu items available</h5>
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if menuItem collection is empty
  if (menuItems.length === 0) {
    return (ready ? (
      <Container id="userhome-page" fluid>
        <div className="ckH">Welcome to Campus Cravings</div>
        <Image
          fluid
          src="../../images/campus-center.png"
        />
        <Row className="colorBlockGreen">
          <Col>
            <h2>Favorite Restaurants</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {vendors.map((vendor, index) => (<Col key={index}><Vendor vendor={vendor} /></Col>))}
            </Row>
          </Col>
          <Col>
            <h2>Favorite Menu Items</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h5>No menu items available</h5>
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if vendor collection is empty
  if (vendors.length === 0) {
    return (ready ? (
      <Container id="userhome-page" fluid>
        <div className="ckH">Welcome to Campus Cravings</div>
        <Image
          fluid
          src="../../images/campus-center.png"
        />
        <Row className="colorBlockGreen">
          <Col>
            <h2>Favorite Restaurants</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h5>No vendors available</h5>
            </Row>
          </Col>
          <Col>
            <h2>Favorite Menu Items</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {menuItems.map((menuItem, index) => (<Col key={index}><MenuItem menuItem={menuItem} /></Col>))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if all collections are available
  return (ready ? (
    <Container id="userhome-page" fluid>
      <div className="ckH">Welcome to Campus Cravings</div>
      <Image
        fluid
        src="../../images/campus-center.png"
      />
      <Row>
        <Col className="colorBlockGreen">
          <h2>Favorite Restaurants</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {vendors.map((vendor, index) => (<Col key={index}><Vendor vendor={vendor} /></Col>))}
          </Row>
        </Col>
        <Col className="colorBlockGreen">
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
