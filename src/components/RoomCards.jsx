import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import rooms from '../data/roomsData';

const RoomCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleCardClick = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    // Reset form fields
    setCustomerName('');
    setPhoneNumber('');
    setCheckInDate('');
    setCheckOutDate('');
    setNumberOfGuests(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      customerName,
      phoneNumber,
      checkInDate,
      checkOutDate,
      roomType: selectedRoom.type,
      numberOfGuests,
    };

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }

      alert('Booking saved successfully');
      handleCloseModal(); // Close the modal after successful submission
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="row">
        {rooms.map((room) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
            key={room.id}
          >
            <div
              className="card shadow-sm p-3"
              onClick={() => handleCardClick(room)}
              style={{ cursor: 'pointer' }}
            >
              <h5 className="card-title">{room.name}</h5>
              <p className="card-text">{room.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Input Data Tamu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Tamu</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama tamu"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>No. HP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nomor HP"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Check-in Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Check-out Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Room</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRoom.name}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Number of Guests</Form.Label>
                <Form.Control
                  type="number"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  min="1"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoomCards;