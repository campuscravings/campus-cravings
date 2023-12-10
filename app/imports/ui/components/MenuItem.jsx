import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const MenuItem = ({ menuItem }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{menuItem.name}</Card.Title>
      <Image src={menuItem.image} width={75} />
    </Card.Header>
    <Card.Body>
      <Card.Text>{menuItem.price}</Card.Text>
      <Card.Text>{menuItem.description}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
MenuItem.propTypes = {
  menuItem: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    owner: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

export default MenuItem;
