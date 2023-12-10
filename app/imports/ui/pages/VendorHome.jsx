import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendors/Vendors';
import { MenuItems } from '../../api/menuItems/MenuItems';
import LoadingSpinner from '../components/LoadingSpinner';
import MenuItem from '../components/MenuItem';

/** Regular Users */
const VendorHome = () => {
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
      <Container id="vendorhome-page" fluid>
        <div className="ckH">{vendors[0].name}</div>
        <Image
          fluid
          src="../../images/paradise-palms.jpeg"
        />
        <Row xs={4} md={6} lg={8} className="g-4">
          <Col className="colorBlockGreen">
            <h5>No menu items available</h5>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if menuItem collection is empty
  if (menuItems.length === 0) {
    return (ready ? (
      <Container id="vendorhome-page" fluid>
        <div className="ckH">{vendors[0].name}</div>
        <Image
          fluid
          src="../../images/paradise-palms.jpeg"
        />
        <Row xs={4} md={6} lg={8} className="g-4">
          <Col className="colorBlockGreen">
            <h5>No menu items available</h5>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if vendor collection is empty
  if (vendors.length === 0) {
    return (ready ? (
      <Container id="vendorhome-page" fluid>
        <div className="ckH">No vendors available</div>
        <Image
          fluid
          src="../../images/paradise-palms.jpeg"
        />
        <Row xs={4} md={6} lg={8} className="g-4">
          <Col className="colorBlockGreen">
            {menuItems.map((menuItem, index) => (<Col className="py-3" key={index}><MenuItem menuItem={menuItem} /></Col>))}
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if all collections are available
  return (ready ? (
    <Container id="vendorhome-page" fluid>
      <div className="ckH">{vendors[0].name}</div>
      <Image
        fluid
        src="../../images/paradise-palms.jpeg"
      />
      <Row xs={4} md={6} lg={8} className="colorBlockGreen">
        <Col>
          {menuItems.map((menuItem, index) => (<Col className="py-3" key={index}><MenuItem menuItem={menuItem} /></Col>))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VendorHome;
