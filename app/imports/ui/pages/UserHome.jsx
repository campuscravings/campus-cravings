import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** Regular Users */
const UserHome = () => (
  <Container id="userhome-page" fluid>
    <Row className="colorBlockBlack">
      <h1>USER WELCOME GRAPHIC (TODO)</h1>
    </Row>
    <Row className="justify-content-center">
      <Col className="colorBlockGreen">
        <h2>Favorite Restaurants</h2>
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
      <Col className="colorBlockWhite">
        <h2>Favorite Menu Items</h2>
        <ul>
          <li>Chili & Hot Dog Plate</li>
          <li>Vanilla Coffee</li>
          <li>Spam Musubi</li>
          <li>Chili & Hot Dog Plate</li>
          <li>Vanilla Coffee</li>
          <li>Spam Musubi</li>
          <li>Chili & Hot Dog Plate</li>
          <li>Vanilla Coffee</li>
          <li>Spam Musubi</li>
          <li>Chili & Hot Dog Plate</li>
          <li>Vanilla Coffee</li>
          <li>Spam Musubi</li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default UserHome;
