import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Regular Users */
const AdminHome = () => (
  <Container id="adminhome-page" fluid>
    <Row className="colorBlockBlack">
      <h1>ADMIN WELCOME GRAPHIC (TODO)</h1>
    </Row>
    <Row className="justify-content-center">
      <Col className="colorBlockGreen">
        <h2>Restaurants</h2>
        <ul>
          <li>Panda Express</li>
          <li>Starbucks</li>
          <li>Dunkin Donuts</li>
          <li>Panda Express</li>
          <li>Starbucks</li>
          <li>Dunkin Donuts</li>
          <li>Panda Express</li>
          <li>Starbucks</li>
          <li>Dunkin Donuts</li>
          <li>Panda Express</li>
          <li>Starbucks</li>
          <li>Dunkin Donuts</li>
        </ul>
      </Col>
      <Col className="vendorBlock">
        <h2>Vendor Approval</h2>
        <Container className="vendorBlock py-2">
          <ul>
            <li>McDonalds: Cody K.</li>
            <li>Taco Bell: Johnathan C.</li>
            <li>Pizza Hut: Travis Q.</li>
            <li>Chick Fil A: Kyle B.</li>
          </ul>
        </Container>
        <Container className="vendorBlock py-2">
          View All
        </Container>
      </Col>
    </Row>
  </Container>
);

export default AdminHome;
