import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';

const AddBooking = () => {
  const [customerName, setCustomerName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [descriptionBooking, setDescriptionBooking] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching rooms');
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setErrorMessage('Check-out date must be after check-in date.');
      return;
    }

    const bookingData = {
      customer_name: customerName,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      id_room: roomId,
      number_of_guests: numberOfGuests,
      description_booking: descriptionBooking,
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
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to add booking');
      }

      setCustomerName('');
      setCheckInDate('');
      setCheckOutDate('');
      setRoomId('');
      setNumberOfGuests(1);
      setDescriptionBooking('');
      setSuccessMessage('Booking added successfully');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding booking: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
        <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">
          Tambah Tamu
        </h2>
        <div className="underline mx-auto" style={{ width: '100px', height: '4px', background: '#007bff' }}></div>
      </div>
          {successMessage && <Alert variant="success" className="rounded-3">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger" className="rounded-3">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="customerName">
                  <Form.Label>Nama Pemesan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="shadow-sm"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="checkInDate">
                  <Form.Label>Check-In Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="shadow-sm"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="checkOutDate">
                  <Form.Label>Check-Out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="shadow-sm"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="roomId">
                  <Form.Label>Room</Form.Label>
                  <Form.Select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="shadow-sm"
                    required
                  >
                    <option value="">Pilih Ruangan</option>
                    {rooms.map((room) => (
                      <option key={room.id_room} value={room.id_room}>
                        {room.room_type} - {room.room_number}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="numberOfGuests">
                  <Form.Label>Jumlah Tamu</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                    className="shadow-sm"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="descriptionBooking">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter booking description"
                    value={descriptionBooking}
                    onChange={(e) => setDescriptionBooking(e.target.value)}
                    className="shadow-sm"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="mt-3 shadow-sm"
              style={{ width: '100%', borderRadius: '10px' }}
            >
              Tambah Tamu
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddBooking;