import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customer_name: '',
    check_in_date: '',
    check_out_date: '',
    id_room: '',
    number_of_guests: '',
    description_booking: '',
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        console.log('Updating booking with ID:', id);
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`);
        if (!response.ok) throw new Error('Failed to fetch booking');
        const data = await response.json();
        setBooking(data);
        setFormData({
          customer_name: data.customer_name,
          check_in_date: data.check_in_date.split('T')[0], // Format date for input
          check_out_date: data.check_out_date.split('T')[0],
          id_room: data.id_room,
          number_of_guests: data.number_of_guests,
          description_booking: data.description_booking,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rooms');
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBooking();
    fetchRooms();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating booking with ID:', id); // Log ID
    console.log('Submitting data:', formData); // Log data yang akan dikirim

    try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Cek apakah respons tidak ok
        if (!response.ok) {
            const text = await response.text(); // Ambil respons sebagai teks
            console.error('Error response:', text); // Log respons untuk debugging
            throw new Error('Failed to update booking');
        }

        const data = await response.json(); // Parse sebagai JSON
        alert('Booking updated successfully');
        navigate('/admin/booking-list'); // Redirect to the booking list
    } catch (error) {
        setError(error.message);
    }
};

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Edit Booking</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {booking && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="customer_name">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="check_in_date">
            <Form.Label>Check-in Date</Form.Label>
            <Form.Control
              type="date"
              name="check_in_date"
              value={formData.check_in_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="check_out_date">
            <Form.Label>Check-out Date</Form.Label>
            <Form.Control
              type="date"
              name="check_out_date"
              value={formData.check_out_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="id_room">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              as="select"
              name="id_room"
              value={formData.id_room}
              onChange={handleChange}
              required
            >
              <option value="">Select Room</option>
              {rooms.map(room => (
                <option key={room.id_room} value={room.id_room}>
                  {room.room_number}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="number_of_guests">
            <Form.Label>Number of Guests</Form.Label>
            <Form.Control
              type="number"
              name="number_of_guests"
              value={formData.number_of_guests}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description_booking">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description_booking"
              value={formData.description_booking}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
    <FaSave className="me-2" />
    Update Booking
</Button>
        </Form>
      )}
    </Container>
  );
};

export default EditBooking;