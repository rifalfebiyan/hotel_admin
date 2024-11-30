import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditRoom = () => {
  const { id_room } = useParams();
  const navigate = useNavigate();
  
  const [roomData, setRoomData] = useState({
    room_number: '',
    room_type: '',
    description: '',
    price_per_night: '',
  });
  
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    console.log('Fetching room data for ID:', id_room);
    const fetchRoomData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${id_room}`);
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to fetch room data');
            }
            const data = await response.json();
            console.log('Room data fetched:', data); // Log data yang diterima
            setRoomData(data);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchRoomData();
}, [id_room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({ ...prevData, [name]: value }));
    if (successMessage) {
      setSuccessMessage(''); // Clear success message when editing
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    // Validate price_per_night
    if (roomData.price_per_night <= 0) {
      setError('Price per night must be a positive number.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/rooms/${id_room}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });
      if (!response.ok) {
        throw new Error('Failed to update room data');
      }
      setSuccessMessage('Room updated successfully!');
      setTimeout(() => navigate('/admin/room'), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading room data...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Edit Room</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleEdit}>
        <Form.Group controlId="formRoomNumber">
          <Form.Label>Room Number</Form.Label>
          <Form.Control
            type="text"
            name="room_number"
            value={roomData.room_number}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRoomType">
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            type="text"
            name="room_type"
            value={roomData.room_type}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={roomData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price per Night</Form.Label>
          <Form.Control
            type="number"
            name="price_per_night"
            value={roomData.price_per_night}
            onChange={handleChange}
            required
            min="0" // Ensure price is a non-negative number
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Room
        </Button>
      </Form>
    </Container>

  );
};

export default EditRoom;