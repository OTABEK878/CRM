import React from 'react';

const MyProfile = () => {
  return (
    <div className="profile-form">
      <h2>My Profile</h2>
      <div className="form-group">
        <label>First Name</label>
        <input type="text" placeholder="Enter first name" />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input type="text" placeholder="Enter last name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="Enter email" />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input type="text" placeholder="Enter username" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="Enter password" />
      </div>
      <button className="update-btn">Update</button>
    </div>
  );
};

export default MyProfile;
