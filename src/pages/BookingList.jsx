import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Form, Button, Row, Col, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // State untuk menyimpan urutan
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State untuk modal delete
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null); // State untuk menyimpan ID booking yang akan dihapus
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
        setFilteredBookings(data);
      } catch (error) {
        setError(error.message);
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

    fetchBookings();
    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBookings(term, sortOrder);
  };

  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    filterBookings(searchTerm, order);
  };

  const filterBookings = (term, order) => {
    let filtered = bookings;

    if (term) {
      filtered = filtered.filter((booking) =>
        booking.customer_name.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Mengurutkan berdasarkan tanggal
    filtered.sort((a, b) => {
      const dateA = new Date(a.check_in_date);
      const dateB = new Date(b.check_in_date);
      return order === 'newest' ? dateB - dateA : dateA - dateB; // Urutkan terbaru atau terlama
    });

    setFilteredBookings(filtered);
  };

  const handleDelete = async () => {
    if (bookingIdToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${bookingIdToDelete}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete booking');
        setBookings(bookings.filter((booking) => booking.id !== bookingIdToDelete));
        setFilteredBookings(filteredBookings.filter((booking) => booking.id !== bookingIdToDelete));
        setShowDeleteModal(false); // Tutup modal setelah berhasil dihapus
        alert('Booking deleted successfully');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const openDeleteModal = (id) => {
    setBookingIdToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>
            Daftar Tamu
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="mb-4">
            <Col md={{ span: 4 }}>
              <Form.Control
                type="text"
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={handleSearch}
                className="shadow-sm"
                style={{ borderRadius: '20px', padding: '10px' }}
              />
            </Col>
            <Col md={{ span: 4 }} className="d-flex justify-content-end">
              <Form.Select
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="shadow-sm"
                style={{ borderRadius: '20px', padding: '10px' }}
              >
                <option value="newest">Urutkan Terbaru</option>
                <option value="oldest">Urutkan Terlama</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table striped bordered hover className="bg-white">
              <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                <tr>
                  <th className="text-center">Nama</th>
                  <th className="text-center">Check-in Date</th>
                  <th className="text-center">Check-out Date</th>
                  <th className="text-center">Nomor Ruangan</th>
                  <th className="text-center">Tamu</th>
                  <th className="text-center">Deskripsi</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => {
                    const room = rooms.find((r) => r.id_room === booking.id_room);
                    return (
                      <tr key={booking.id}>
                        <td className="text-center">{booking.customer_name || '-'}</td>
                        <td className="text-center">{new Date(booking.check_in_date).toLocaleDateString() || '-'}</td>
                        <td className="text-center">{new Date(booking.check_out_date).toLocaleDateString() || '-'}</td>
                        <td className="text-center">{room ? room.room_number : '-'}</td>
                        <td className="text-center">{booking.number_of_guests || '-'}</td>
                        <td className="text-center">{booking.description_booking || 'No description'}</td>
                        <td className="text-center">
                          <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => navigate(`/admin/booking/${booking.id}`)}
                            style={{ borderRadius: '5px', minWidth: '80px' }}
                          >
                            <i className="bi bi-eye"></i> Detail
                          </Button>
                          <Button
                            variant="warning"
                            className="me-2"
                            onClick={() => navigate(`/admin/edit-booking/${booking.id}`)}
                            style={{ borderRadius: '5px', minWidth: '80px' }}
                          >
                            <i className="bi bi-pencil"></i> Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => openDeleteModal(booking.id)}
                            style={{ borderRadius: '5px', minWidth: '80px' }}
                          >
                            <i className="bi bi-trash"></i> Hapus
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Modal Konfirmasi Hapus */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus booking ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookingList;