import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar className="customNav" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2 className="customNav">Campus Cravings</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="user-home-nav" as={NavLink} to="/userhome" key="userhome">User Home</Nav.Link>,
              <Nav.Link id="user-profile-nav" as={NavLink} to="/userprofile" key="userprofile">User Profile</Nav.Link>,
              <Nav.Link id="profile-nav" as={NavLink} to="/profile" key="profile">Profile</Nav.Link>,
              <Nav.Link id="list-vendors-nav" as={NavLink} to="/list" key="vendors">Vendors</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
              <Nav.Link id="vendor-home-nav" as={NavLink} to="/vendorhome" key="vendorhome">Vendor Home</Nav.Link>,
              <Nav.Link id="add-menu-item-nav" as={NavLink} to="/addmenuitem" key="addmenuitem">Add Menu Item</Nav.Link>,

            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="admin-home-nav" as={NavLink} to="/adminhome" key="adminhome">Admin Home</Nav.Link>,
              <Nav.Link id="add-vendors-nav" as={NavLink} to="/addvendor" key="admin">Add Vendor</Nav.Link>,
            ]) : ''}
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
