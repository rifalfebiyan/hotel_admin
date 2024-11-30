import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Navbar = ({ onToggleSidebar, onLogout }) => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleLogoutClick = () => {
    setShowModal(true); // Show the modal when logout button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleConfirmLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    handleCloseModal(); // Close the modal after logout
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          position: 'fixed',
          top: '0',
          width: '100%',
          zIndex: 1100,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="container-fluid">
          <button
            className="btn btn-outline-primary me-2 d-lg-none"
            onClick={onToggleSidebar}
          >
            <i className="bi bi-list"></i>
          </button>
          <span className="navbar-brand">Gerhana Admin</span>
          <button className="btn btn-outline-danger ms-auto" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;