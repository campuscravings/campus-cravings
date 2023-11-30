import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Vendor table. See pages/ListVendors.jsx. */
const Vendor = ({ vendor }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{vendor.name}</Card.Title>
      <Card.Subtitle>{vendor.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{vendor.hours}</Card.Text>
      <Card.Text>{vendor.description}</Card.Text>
      <Link to={`/menu/${vendor.name}`}>
        <Button variant="primary">View Menu</Button>
      </Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Vendor.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    hours: PropTypes.string,
    logo: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Vendor;
