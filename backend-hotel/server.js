const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke Database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel_booking'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Endpoint untuk menambahkan booking
app.post('/api/bookings', (req, res) => {
    const { customer_name, check_in_date, check_out_date, id_room, number_of_guests, description_booking } = req.body;

    console.log('Booking Data:', req.body); // Log received data
    const sql = 'INSERT INTO bookings (customer_name, check_in_date, check_out_date, id_room, number_of_guests, description_booking) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [customer_name, check_in_date, check_out_date, id_room, number_of_guests, description_booking], (err, result) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Booking added successfully', bookingId: result.insertId });
    });
});

// Endpoint untuk mengambil data bookings
app.get('/api/bookings', (req, res) => {
  const sql = 'SELECT * FROM bookings';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});


// Endpoint for updating a booking
app.put('/api/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const { customer_name, check_in_date, check_out_date, id_room, number_of_guests, description_booking } = req.body;

    const sql = `
        UPDATE bookings 
        SET customer_name = ?, check_in_date = ?, check_out_date = ?, id_room = ?, number_of_guests = ?, description_booking = ?
        WHERE id = ?`;

    db.query(sql, [customer_name, check_in_date, check_out_date, id_room, number_of_guests, description_booking, bookingId], (err, result) => {
        if (err) {
            console.error('Error updating booking:', err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Query untuk mendapatkan informasi kamar berdasarkan id_room
        const roomSql = 'SELECT * FROM rooms WHERE id_room = ?';
        db.query(roomSql, [id_room], (err, roomResult) => {
            if (err) {
                console.error('Error fetching room:', err);
                return res.status(500).json({ error: err.message });
            }

            if (roomResult.length === 0) {
                return res.status(404).json({ message: 'Room not found' });
            }

            // Mengembalikan data booking yang diperbarui beserta data kamar
            res.json({
                message: 'Booking updated successfully',
                bookingId: bookingId,
                updatedBooking: {
                    customer_name,
                    check_in_date,
                    check_out_date,
                    id_room,
                    number_of_guests,
                    description_booking,
                },
                room: roomResult[0] // Mengembalikan data kamar yang ditemukan
            });
        });
    });
});

// Endpoint untuk menghapus booking
app.delete('/api/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const sql = 'DELETE FROM bookings WHERE id = ?';

    db.query(sql, [bookingId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted successfully' });
    });
});

// Endpoint untuk menambahkan kamar baru
app.post('/api/rooms', (req, res) => {
    const { room_number, room_type, description, price_per_night } = req.body;
    const sql = 'INSERT INTO rooms (room_number, room_type, description, price_per_night) VALUES (?, ?, ?, ?)';

    db.query(sql, [room_number, room_type, description, price_per_night], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ message: 'Room added successfully' });
    });
});

// Endpoint untuk mengambil semua data kamar
app.get('/api/rooms', (req, res) => {
    const sql = 'SELECT * FROM rooms';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
});

// Endpoint untuk menghapus kamar
app.delete('/api/rooms/:id_room', (req, res) => {
    const roomId = req.params.id_room;
    const sql = 'DELETE FROM rooms WHERE id_room = ?';

    db.query(sql, [roomId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json({ message: 'Room deleted successfully' });
    });
});

// Endpoint untuk mengambil kamar berdasarkan ID
app.get('/api/rooms/:id_room', (req, res) => {
    const roomId = req.params.id_room;
    const sql = 'SELECT * FROM rooms WHERE id_room = ?';

    db.query(sql, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching room:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(results[0]);
    });
});

// Endpoint untuk memperbarui data kamar
app.put('/api/rooms/:id_room', (req, res) => {
    const roomId = req.params.id_room;
    const { room_number, room_type, description, price_per_night } = req.body;

    const sql = 'UPDATE rooms SET room_number = ?, room_type = ?, description = ?, price_per_night = ? WHERE id_room = ?';
    db.query(sql, [room_number, room_type, description, price_per_night, roomId], (err, result) => {
        if (err) {
            console.error('Error updating room:', err);
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json({ message: 'Room updated successfully' });
    });
});

// Endpoint untuk mengambil booking berdasarkan ID
app.get('/api/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const sql = `
        SELECT b.*, r.room_number, r.room_type, r.description, r.price_per_night
        FROM bookings b
        JOIN rooms r ON b.id_room = r.id_room
        WHERE b.id = ?`;

    db.query(sql, [bookingId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(result[0]);
    });
});


// Login endpoint
app.post('/api/users', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if user exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
          return res.status(500).json({ message: 'Database error' });
      }
      if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid username or password.' });
      }

      const user = results[0];

      // Compare password (in plain text)
      if (user.password === password) {
          // Authentication successful
          res.json({ success: true, message: 'Login successful', user });
      } else {
          // Authentication failed
          res.status(401).json({ success: false, message: 'Invalid username or password.' });
      }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});