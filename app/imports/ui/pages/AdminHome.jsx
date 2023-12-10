import React from 'react';
import { Col, Container, Image, Row, Form, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Vendors } from '../../api/vendors/Vendors';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorAdmin from '../components/VendorAdmin';

/** Admin Home */
const AdminHome = () => {
  const { ready, vendors, profiles } = useTracker(() => {
    // Get access to vendor and menu item documents.
    const subscription = Meteor.subscribe(Vendors.adminPublicationName);
    const subscription2 = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the vendor and menu item documents
    const vendorItems = Vendors.collection.find({}).fetch();
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  if (profiles.length === 0 || vendors.length === 0) {
    return (ready ? (
      <Container id="adminhome-page" fluid>
        <div className="ckH">Admin</div>
        <Image
          fluid
          src="../../images/food-court.png"
        />
        <Row className="colorBlockGreen">
          <Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {vendors.map((vendor) => (<Col key={vendor._id}><VendorAdmin vendor={vendor} /></Col>))}
            </Row>
          </Col>
          <Col className="vendorBlock py-2">
            <h2>Vendor Approval</h2>
            <Container className="vendorBlock py-2">
              <Form>
                <Form.Group className="mb-3" controlId="formApproveDeny">
                  <Row>
                    <Col className="col-6 mt-2">
                      <Form.Label>VENDOR NAME</Form.Label>
                    </Col>
                    <Col className="col-2 mt-2">
                      <Form.Check type="checkbox" label="Approve" />
                    </Col>
                    <Col className="col-2 mt-2">
                      <Form.Check type="checkbox" label="Deny" />
                    </Col>
                    <Col className="col-2">
                      <Button variant="success" type="submit">Submit</Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Container>
            <div><br /></div>
            <Container className="vendorBlock py-2">
              View All
            </Container>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }

  // if all collections are available
  return (ready ? (
    <Container id="adminhome-page" fluid>
      <div className="ckH">Admin</div>
      <Image
        fluid
        src="../../images/food-court.png"
      />
      <Row className="colorBlockGreen">
        <Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {vendors.map((vendor) => (<Col key={vendor._id}><VendorAdmin vendor={vendor} /></Col>))}
          </Row>
        </Col>
        <Col className="vendorBlock py-2">
          <h2>Vendor Approval</h2>
          <Container className="vendorBlock py-2">
            <ul>
              <li>McDonalds: Cody K.</li>
              <li>Taco Bell: Johnathan C.</li>
              <li>Pizza Hut: Travis Q.</li>
              <li>Chick Fil A: Kyle B.</li>
            </ul>
          </Container>
          <div><br /></div>
          <Container className="vendorBlock py-2">
            View All
          </Container>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminHome;
