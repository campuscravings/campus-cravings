import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid>
    <Row className="align-middle text-left py-3">

      <Col className="d-flex flex-column justify-content-center px-5">
        <h1>Feelin&#39; Hungry? We Got You</h1>
      </Col>
      <Col xs={6} className="d-flex flex-column justify-content-center">
        <h3>Navigate Above to Browse Menus and Satisfy Cravings</h3>
      </Col>
    </Row>
    <Image src="images/manoa.jpg" fluid />
  </Container>
);

export default Landing;
