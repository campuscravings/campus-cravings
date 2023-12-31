import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonCircle, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  function routeHome() {
    if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      return (
        <Navbar.Brand as={NavLink} to="/vendorhome">
          <h2 className="customNav">Campus Cravings</h2>
        </Navbar.Brand>
      );
    }
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
        <Navbar.Brand as={NavLink} to="/adminhome">
          <h2 className="customNav">Campus Cravings</h2>
        </Navbar.Brand>
      );
    }
    return (
      <Navbar.Brand as={NavLink} to="/userhome">
        <h2 className="customNav">Campus Cravings</h2>
      </Navbar.Brand>
    );
  }

  function routeListVendor() {
    if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      return ([
        <Nav.Link id="add-menu-item-nav" as={NavLink} to="/addmenuitem" key="addMI">Add Menu Item</Nav.Link>,
      ]);
    }
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return ([
        <Nav.Link id="list-vendors-admin-nav" as={NavLink} to="/admin" key="listVA">(Admin)Vendors</Nav.Link>,
        <Nav.Link id="add-vendors-nav" as={NavLink} to="/addvendor" key="addV">Add Vendor</Nav.Link>,
      ]);
    }
    return ([
      <Nav.Link id="list-vendors-nav" as={NavLink} to="/list" key="listV">List Vendors</Nav.Link>,
    ]);
  }

  return (
    <Navbar className="customNav" expand="lg">
      <Container>
        {routeHome()}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" me-auto justify-content-start">
            {routeListVendor()}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="profile-nav" as={NavLink} to="/profile">
                  <PersonCircle />
                  {' '}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
