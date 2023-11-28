import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Row, Image, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { MenuItems } from '../../api/menuItem/MenuItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Menu = () => {
  const { vendorName } = useParams();
  const { menuItems, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe(MenuItems.publicationName);
    const items = MenuItems.collection.find({ vendor: vendorName }).fetch();

    // console.log('Subscription ready:', subscription.ready()); // Check subscription status
    // console.log('Items:', items); // Check the fetched items

    return { menuItems: items, isLoading: !subscription.ready() };
  }, [vendorName]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (menuItems.length === 0) {
    return <div>No menu items available for {vendorName}.</div>;
  }

  return (
    <Container id="menu-page" className="py-3">
      <h1 className="text-center">{vendorName} Menu</h1>
      <Row xs={1} md={2} lg={3} className="g-4 my-1">
        {menuItems
          .filter(item => item.available).map(item => (
            <Col key={item._id}>
              <Card>
                <Card.Body>
                  <Container className="text-center">
                    {item.vegan && (
                      <Image
                        src="/images/vegan_ICON.png"
                        id="vegan-icon"
                        style={{ position: 'absolute', top: '5px', right: '5px', maxWidth: '25px' }}
                      />
                    )}

                    <Image
                      id="menu-item-image"
                      src={item.image}
                      style={{ maxWidth: '300px', display: 'inline-block', border: '5px solid #ccc', position: 'relative' }}
                      className="img-fluid"
                    />
                  </Container>
                  <Row className="my-2">
                    <Card.Title id="menu-item-name"><strong>{item.name}</strong></Card.Title>
                  </Row>
                  <div className="border p-3 my-1">
                    <Card.Text id="menu-item-description">{item.description}</Card.Text>
                  </div>
                  <Row className="text-center my-1">
                    <Col>
                      <span id="menu-item-cost" className="badge bg-success rounded-pill">
                        ${item.cost}
                      </span>
                    </Col>
                    <Col>
                      <span id="menu-item-calories" className="badge bg-secondary rounded-pill">
                        Calories: {item.calories}
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Menu;
