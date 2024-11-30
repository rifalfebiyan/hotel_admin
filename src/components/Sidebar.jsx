import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        toggleSidebar(); // Menutup sidebar jika klik di luar dan dalam mode mobile
      }
    };

    // Menambahkan event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Menghapus event listener saat komponen di-unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar, isMobile]);

  const isActive = (path) => location.pathname === path;

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      style={{
        width: isOpen ? '250px' : '0',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        overflowY: 'auto',
        backgroundColor: '#f8f9fa',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        zIndex: 1050,
        transition: 'width 0.3s ease',
      }}
    >
      <nav className="nav flex-column p-3">
        <p className="text-uppercase text-muted fw-bold small mb-5">-- MAIN</p>
        <Link
          to="/admin/home"
          className={`nav-link sidebar-item mb-2 ${isActive('/admin/home') ? 'active' : ''}`}
        >
          <i className="bi bi-house-door-fill me-2"></i> Home
        </Link>
        <Link
          to="/admin/booking-list"
          className={`nav-link sidebar-item mb-2 ${isActive('/admin/booking-list') ? 'active' : ''}`}
        >
          <i className="bi bi-person-fill me-2"></i> Data Tamu
        </Link>
        <Link
          to="/admin/add-booking"
          className={`nav-link sidebar-item mb-2 ${isActive('/admin/add-booking') ? 'active' : ''}`}
        >
          <i className="bi bi-plus me-2"></i> Tambah Tamu
        </Link>
        <Link
          to="/admin/room"
          className={`nav-link sidebar-item mb-2 ${isActive('/admin/room') ? 'active' : ''}`}
        >
          <i className="bi bi-door-open-fill me-2"></i> Kamar
        </Link>
        <Link
          to="/admin/user-management"
          className={`nav-link sidebar-item mb-2 ${isActive('/admin/user-management') ? 'active' : ''}`}
        >
          <i className="bi bi-people-fill me-2"></i> User Management
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
