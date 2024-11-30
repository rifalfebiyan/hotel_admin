// src/pages/UserManagement.jsx
import React from 'react';

const UserManagement = () => {
  return (
    <div className="container" style={{ marginLeft: '260px', padding: '20px' }}>
      <h2>User Management</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Users</h5>
          <p className="card-text">Here you can add, edit, and remove users from the system.</p>
          <a href="#" className="btn btn-success">Manage Users</a>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;