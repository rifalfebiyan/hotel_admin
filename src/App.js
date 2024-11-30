import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import EditBooking from './pages/EditBooking';
import Login from './pages/Login'; // Import the Login component

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for authentication state
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const login = () => {
    setIsAuthenticated(true); // Set authenticated state to true
    localStorage.setItem('isAuthenticated', 'true'); // Store authentication state
  };

  const logout = () => {
    setIsAuthenticated(false); // Set authenticated state to false
    localStorage.removeItem('isAuthenticated'); // Remove authentication state
  };

  return (
    <Router>
      {/* Check if the user is authenticated */}
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login onLogin={login} />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={isAuthenticated ? (
          <>
            <Navbar onToggleSidebar={toggleSidebar} onLogout={logout} />
            <div style={{ display: 'flex', marginTop: '56px' }}>
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
              <div
                className="main-content"
                style={{
                  marginLeft: isSidebarOpen && !isMobile ? '250px' : '0',
                  padding: '20px',
                  transition: 'margin-left 0.3s ease',
                  width: '100%',
                }}
              >
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="room" element={<Room />} />
                  <Route path="user-role" element={<UserRoles />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="add-booking" element={<AddBooking />} />
                  <Route path="add-room" element={<AddRoom />} />
                  <Route path="edit-booking/:id" element={<EditBooking />} />
                  <Route path="edit-room/:id_room" element={<EditRoom />} />
                  <Route path="booking/:id" element={<DetailBooking />} />
                  <Route path="booking-list" element={<BookingList />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Navigate to="/login" />
        )} />
        
        {/* Redirect to login if trying to access admin routes without authentication */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;