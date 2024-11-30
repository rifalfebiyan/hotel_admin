import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Alert, Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [roomIdToDelete, setRoomIdToDelete] = useState(null); // State to store the ID of the room to be deleted
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rooms');
        if (!response.ok) {
          console.error('Response status:', response.status); // Add this for logging
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = rooms.filter((room) =>
        room.room_number.toString().includes(term) ||
        room.room_type.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
    console.log('Rendering rooms:', filteredRooms);
  };

  const handleDelete = async () => {
    if (roomIdToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/rooms/${roomIdToDelete}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete room');
        }
        setRooms(rooms.filter(room => room.id_room !== roomIdToDelete));
        setFilteredRooms(filteredRooms.filter(room => room.id_room !== roomIdToDelete));
        setShowDeleteModal(false); // Close modal after successful deletion
        alert('Room deleted successfully');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const openDeleteModal = (id_room) => {
    setRoomIdToDelete(id_room);
    setShowDeleteModal(true);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Manajemen Ruangan</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          type="text"
          placeholder="Search by room number or type"
          value={searchTerm}
          onChange={handleSearch}
          className="w-50"
        />
        <Link to="/admin/add-room">
          <Button variant="primary">
            <i className="bi bi-plus-lg"></i> Tambah Kamar
          </Button>
        </Link>
      </div>

      <Row>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <Col lg={4} md={6} sm={12} className="mb-4" key={room.id_room}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>
                    Room {room.room_number} - {room.room_type}
                  </Card.Title>
                  <Card.Text>
                    <strong>Deskripsi:</strong> {room.description || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Harga:</strong> Rp.{room.price_per_night}
                  </Card.Text>
                  <Card.Text>
                    <small className="text-muted">
                      Dibuat pada: {new Date(room.created_at).toLocaleString()}
                    </small>
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="info" size="sm" className="me-2">
                    <i className="bi bi-eye"></i> Detail
                    </Button>
                    <Button variant="warning" 
                            size="sm" 
                            className="me-2" 
                            onClick={() => navigate(`/admin/edit-room/${room.id_room}`)}>
                      <i className="bi bi-pencil"></i> Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-auto"
                      onClick={() => openDeleteModal(room.id_room)}
                    >
                      <i className="bi bi-trash"></i> Hapus
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="text-center">
              No rooms available.
            </Alert>
          </Col>
        )}
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus kamar ini?
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

export default Room;