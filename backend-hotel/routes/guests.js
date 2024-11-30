// routes/guests.js
const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');

// Mendapatkan semua tamu
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.findAll();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menambahkan tamu baru
router.post('/', async (req, res) => {
  const { name, checkIn, checkOut, roomType, numberOfGuests } = req.body;

  try {
    const guest = await Guest.create({
      name,
      checkIn,
      checkOut,
      roomType,
      numberOfGuests,
    });
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Menghapus tamu
router.delete('/:id', async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    await guest.destroy();
    res.json({ message: 'Guest deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;