import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Vendor = ({ vendor }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{vendor.name}</Card.Title>
      <Card.Subtitle>{vendor.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{vendor.hours}</Card.Text>
      <Card.Text>{vendor.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Card.Text>{vendor.menu}</Card.Text>
      <Card.Text>{vendor.tags}</Card.Text>
    </Card.Footer>
  </Card>
);

// Require a document to be passed to this component.
Vendor.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    hours: PropTypes.string,
    tags: PropTypes.string,
    menu: PropTypes.string,
    logo: PropTypes.string,
    owner: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

export default Vendor;
