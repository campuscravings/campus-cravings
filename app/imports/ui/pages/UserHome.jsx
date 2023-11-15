import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Regular Users */
const UserHome = () => (
  <Container fluid>
    <Row className="justify-content-center">
      <Col className="colorBlockGreen py-3">
        <h2>Favorite Restaurants</h2>
        <ul>
          <li>Panda Express</li>
          <li>Starbucks</li>
          <li>Dunkin Donuts</li>
        </ul>
      </Col>
      <Col className="colorBlockWhite py-3">
        <h2>Favorite Menu Items</h2>
        <ul>
          <li>Chili & Hot Dog Plate</li>
          <li>Vanilla Coffee</li>
          <li>Spam Musubi</li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default UserHome;
