import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/Stuff';
import LoadingSpinner from '../components/LoadingSpinner';
import Vendor from '../components/Vendor';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListVendors = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  const vendors = [{ name: 'Panda Express', address: '2560 McCarthy Mall Paradise Palms, Honolulu, HI 96822',
    description: 'Panda Express is an American fast food restaurant chain that specializes in American Chinese cuisine.',
    hours: '10:00AM - 4:30PM', tags: ['Chinese', 'Fast-Food'], menu: ['Orange Chicken', 'Fried Rice'],
    logo: 'https://delmarhighlandstowncenter.com/wp-content/uploads/2020/09/DMHTC_Listing_Feature_PandaExpresslogo.jpg' }];
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List of Vendors</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {vendors.map((vendor, index) => (<Col key={index}><Vendor vendor={vendor} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListVendors;
