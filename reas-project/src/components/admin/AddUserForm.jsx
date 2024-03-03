import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const AddUserForm = ({ isOpen, onRequestClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    username: "",
    password: "",
    confirmPassword: "",
    citizenId: "",
    phoneNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!newUser.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!newUser.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!newUser.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(newUser.email)) {
      errors.email = "Invalid email address";
    }

    if (!newUser.password.trim()) {
      errors.password = "Password is required";
    } else if (newUser.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!newUser.username.trim()) {
      errors.username = "Username is required";
    }
    if (!isValidPassword(newUser.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!newUser.gender.trim()) {
      errors.gender = "Gender is required";
    }
    if (newUser.citizenId.trim().length !== 12) {
      errors.citizenId =
        "Citizen ID must be a string with a minimum length of '12'";
    }

    if (!isValidPhoneNumber(newUser.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone Number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // You can use a more sophisticated password validation regex here
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleAddUser = () => {
    if (validateForm()) {
      onAddUser(newUser);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        username: "",
        password: "",
        confirmPassword: "",
        citizenId: "",
        gender: "",
        phoneNumber: "",
      });
      setValidationErrors({});
      onRequestClose(); // Close the modal after adding the user
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add User Modal"
      className="add-user-form-modal"
    >
      <div className="add-user-form">
        <h2>Add New User</h2>
        <form>
          <label>
            First Name<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
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
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            {validationErrors.lastName && (
              <span className="error-message">{validationErrors.lastName}</span>
            )}
          </label>
          <label>
            Username<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="username"
              value={newUser.username}
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
              value={newUser.email}
              onChange={handleInputChange}
            />
            {validationErrors.email && (
              <span className="error-message">{validationErrors.email}</span>
            )}
          </label>
          <label>
            Password<span style={{ color: "red" }}>*</span>:
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
            {validationErrors.password && (
              <span className="error-message">{validationErrors.password}</span>
            )}
          </label>
          <label>
            Confirm Password<span style={{ color: "red" }}>*</span>:
            <input
              type="password"
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleInputChange}
            />
            {validationErrors.confirmPassword && (
              <span className="error-message">
                {validationErrors.confirmPassword}
              </span>
            )}
          </label>
          <label>
            Gender<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="gender"
              value={newUser.gender}
              onChange={handleInputChange}
            />
            {validationErrors.gender && (
              <span className="error-message">{validationErrors.gender}</span>
            )}
          </label>
          <label>
            Citizen Id<span style={{ color: "red" }}>*</span>:
            <input
              type="text"
              name="citizenId"
              value={newUser.citizenId}
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
              value={newUser.phoneNumber}
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
              value={newUser.dateOfBirth}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleAddUser}>
            Add User
          </button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddUserForm;
