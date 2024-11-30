import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Room from './pages/Room';
import './App.css';
import BookingList from './pages/BookingList';
import AddBooking from './pages/AddBooking';
import UserRoles from './pages/UserRoles';
import UserManagement from './pages/UserManagement';
import DetailBooking from './pages/DetailBooking';
import AddRoom from './pages/AddRoom';
import EditRoom from './pages/EditRoom';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar default terbuka
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992); // Mobile jika layar ≤ 992px
      if (window.innerWidth > 992) {
        setIsSidebarOpen(true); // Sidebar selalu terbuka di desktop
      }
    };

    handleResize(); // Jalankan saat pertama kali
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fungsi toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Navbar onToggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', marginTop: '56px' }}>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

        {/* Konten Utama */}
        <div
          className="main-content"
          style={{
            marginLeft: isSidebarOpen && !isMobile ? '250px' : '0', // Atur margin untuk desktop
            padding: '20px',
            transition: 'margin-left 0.3s ease',
            width: '100%',
          }}
        >
          <Routes>
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/room" element={<Room />} />
            <Route path="/admin/user-role" element={<UserRoles />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/add-booking" element={<AddBooking />} />
            <Route path="/admin/add-room" element={<AddRoom />} />
            <Route path="/admin/edit-room/:id" element={<EditRoom />} />
            <Route path="/admin/booking/:id" element={<DetailBooking />} />
            <Route path="/admin/booking-list" element={<BookingList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;