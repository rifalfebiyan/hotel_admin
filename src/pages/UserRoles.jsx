// src/pages/UserRoles.jsx
import React from 'react';

const UserRoles = () => {
  return (
    <div className="container" style={{ marginLeft: '260px', padding: '20px' }}>
      <h2>User Roles</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage User Roles</h5>
          <p className="card-text">Here you can create, edit, and delete user roles.</p>
          <a href="#" className="btn btn-warning">Manage Roles</a>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;