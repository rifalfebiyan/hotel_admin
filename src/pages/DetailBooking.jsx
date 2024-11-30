import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Alert, Button, Card, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaRegCalendarAlt, FaUser  } from 'react-icons/fa';

const DetailBooking = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const navigate = useNavigate(); // Use navigate for routing
  const [booking, setBooking] = useState(null); // State for booking details
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookingDetails(); // Fetch booking details on component mount
  }, [id]);

  // Handle back button click
  const handleBack = () => {
    navigate('/'); // Navigate back to the booking list
  };

  return (
    <Container className="mt-2">
      <Card className="shadow-lg border-0">
        <Card.Body>
          {/* Header */}
          <Row className="text-center mb-3">
            <Col>
              <h3 className="text-primary">
                <FaUser  className="me-2" />
                Detail Tamu
              </h3>
            </Col>
          </Row>
          <hr />

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {/* Booking Details */}
          {booking ? (
            <Row className="justify-content-center">
              <Col md={8}>
                <Card className="border-light shadow-sm p-3 mb-4">
                  <Card.Body>
                    <Card.Title className="text-center text-secondary mb-3">
                      Pemesan: <strong>{booking.customer_name}</strong>
                    </Card.Title>
                    <Row>
                      <Col sm={6} className="mb-3">
                        <p>
                          <FaRegCalendarAlt className="me-2 text-primary" />
                          <strong>Check-in:</strong> <br />
                          {new Date(booking.check_in_date).toLocaleDateString()}
                        </p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p>
                          <FaRegCalendarAlt className="me-2 text-primary" />
                          <strong>Check-out:</strong> <br />
                          {new Date(booking.check_out_date).toLocaleDateString()}
                        </p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p>
                          <strong>Nomor Ruangan:</strong> <br />
                          {booking.room_number}
                        </p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p>
                          <strong>Tipe Ruangan:</strong> <br />
                          {booking.room_type}
                        </p>
                      </Col>
                      <Col sm={12} className="mb-3">
                        <p>
                          <strong>Deskripsi Ruangan:</strong> <br />
                          {booking.description || 'No description available'}
                        </p>
                      </Col>
                      <Col sm={12} className="mb-3">
                        <p>
                          <strong>Deskripsi Pemesanan:</strong> <br />
                          {booking.description_booking || 'No booking description available'}
                        </p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p>
                          <strong>Harga/Malam:</strong> <br />
                          Rp {booking.price_per_night.toLocaleString()}
                        </p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p>
                          <strong>Jumlah Tamu:</strong> <br />
                          {booking.number_of_guests}
                        </p>
                      </Col>
                      <Col sm={12}>
                        <p>
                          <strong>Dibuat pada:</strong> <br />
                          {new Date(booking.created_at).toLocaleString()}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">Loading booking details...</p>
            </div>
          )}

          {/* Back Button */}
          <Row>
            <Col className="text-center">
              <Button as={Link} to="/admin/booking-list" variant="outline-primary" size="lg">
                <FaArrowLeft className="me-2" />
                Kembali ke Daftar Tamu
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DetailBooking;