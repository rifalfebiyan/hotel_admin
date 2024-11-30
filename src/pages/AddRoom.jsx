import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';

const AddRoom = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const roomTypes = [
    { value: 'Ekonomi I', label: 'Ekonomi I' },
    { value: 'Ekonomi II', label: 'Ekonomi II' },
    { value: 'Kelas I', label: 'Kelas I' },
    { value: 'Family', label: 'Family' },
    { value: 'Kelas II', label: 'Kelas II' },
    { value: 'VIP', label: 'VIP' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      room_number: roomNumber,
      room_type: roomType,
      description,
      price_per_night: pricePerNight,
    };

    try {
      const response = await fetch('http://localhost:5000/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to add room');
      }

      setRoomNumber('');
      setRoomType('');
      setDescription('');
      setPricePerNight('');
      setSuccessMessage('Room added successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error adding room. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <Container className="mt-5">
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">
          Tambah Ruangan Baru
        </h2>
        <div className="underline mx-auto" style={{ width: '100px', height: '4px', background: '#007bff' }}></div>
      </div>

      <Card className="shadow-lg p-4">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="roomNumber">
                <Form.Label>Nomor Ruangan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter room number (e.g., 101)"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="roomType">
                <Form.Label>Tipe Ruangan</Form.Label>
                <Form.Select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  required
                >
                  <option value="">Pilih Tipe Ruangan</option>
                  {roomTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="description" className="mb-4">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Provide a brief description of the room"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="pricePerNight" className="mb-4">
            <Form.Label>Harga per Malam (Rp.)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price per night (e.g., 100)"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              className="px-5 py-2"
              style={{
                transition: '0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              Tambah Ruangan
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddRoom;
