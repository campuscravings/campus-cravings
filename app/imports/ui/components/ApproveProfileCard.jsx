import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

/** Renders a profile card for a vendor seeking approval for vendor role. See pages/AdminHome.jsx. */
const ApproveProfileCard = ({ profile }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{profile.name}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Button className="btn btn-primary">Approve</Button>
      <Button className="btn btn-danger">Deny</Button>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ApproveProfileCard.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ApproveProfileCard;
