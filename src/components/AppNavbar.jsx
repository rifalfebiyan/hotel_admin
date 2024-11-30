import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/admin/home">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/admin/booking-list">Data Tamu</Nav.Link>
          <Nav.Link as={Link} to="/admin/add-booking">Tambah Tamu</Nav.Link>
          <Nav.Link as={Link} to="/admin/room">Kamar</Nav.Link>
          <Nav.Link as={Link} to="/admin/staff">Staff</Nav.Link>
          <Nav.Link as={Link} to="/admin/calendar">Calendar</Nav.Link>
          <Nav.Link as={Link} to="/admin/task">Task</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;