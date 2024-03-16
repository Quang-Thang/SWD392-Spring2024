import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const EditUserForm = ({ isOpen, onRequestClose, onEditUser, userToEdit }) => {
  const [editedUser, setEditedUser] = useState(userToEdit || {});
  const [validationErrors, setValidationErrors] = useState({});

  console.log(onEditUser);

  useEffect(() => {
    // Update editedUser when userToEdit changes
    setEditedUser(userToEdit || {});
  }, [userToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!editedUser.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!editedUser.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!editedUser.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(editedUser.email)) {
      errors.email = "Invalid email address";
    }

    if (!editedUser.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEditUser = () => {
    if (validateForm()) {
      onEditUser(editedUser);
      onRequestClose();
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit User Modal"
      className="add-user-form-modal"
    >
      <div className="edit-user-form">
        <h2>Edit User</h2>
        <form>
          <label>
            First Name<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
            />
            {validationErrors.firstName && (
              <span className="error-message">
                {validationErrors.firstName}
              </span>
            )}
          </label>
          <label>
            Last Name<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
            />
            {validationErrors.lastName && (
              <span className="error-message">{validationErrors.lastName}</span>
            )}
          </label>
          <label>
            username<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
            />
            {validationErrors.lastName && (
              <span className="error-message">{validationErrors.lastName}</span>
            )}
          </label>
          <label>
            Email<span style={{ color: "red" }}>*</span>:
            <input
              required
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
            {validationErrors.email && (
              <span className="error-message">{validationErrors.email}</span>
            )}
          </label>
          <label>
            Citizen Id<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="citizenId"
              value={editedUser.citizenId}
              onChange={handleInputChange}
            />
            {validationErrors.citizenId && (
              <span className="error-message">
                {validationErrors.citizenId}
              </span>
            )}
          </label>
          <label>
            Phone Number<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={handleInputChange}
            />
            {validationErrors.phoneNumber && (
              <span className="error-message">
                {validationErrors.phoneNumber}
              </span>
            )}
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={editedUser.dateOfBirth}
              onChange={handleInputChange}
            />
            {validationErrors.dateOfBirth && (
              <span className="error-message">
                {validationErrors.dateOfBirth}
              </span>
            )}
          </label>
          <button type="button" onClick={handleEditUser}>
            Update User
          </button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserForm;
