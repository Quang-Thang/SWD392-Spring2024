import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/APIRequest";
import Input from "./Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    citizenId: "",
    gender: "Male",
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

    if (newUser.citizenId.trim().length !== 12) {
      errors.citizenId =
        "Citizen ID must be a string with a minimum length of '12'";
    }

    if (!isValidPhoneNumber(newUser.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone Number";
    }

    // check dateOfBirth is choose
    if (!newUser.dateOfBirth || newUser.dateOfBirth === "") {
      errors.dateOfBirth = "Date of Birth is required";
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await registerUser(newUser, dispatch, navigate);
        setValidationErrors({});
        console.log("success");
      } catch (error) {
        console.log("Bug at register: ", error);
      }
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-shrink-0 w-1/2">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Your Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center flex-1 flex-shrink-0 w-full p-4 bg-blue-300 border-l border-gray-300">
        <div className="max-w-screen-md p-4 mx-auto border-blue-500 rounded-md ">
          <h2 className="text-2xl font-bold text-gray-500">
            Please create an account if you don't have one{" "}
          </h2>

          <form onSubmit={handleRegister} className="space-y-3">
            <label className="text-lg font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              type="email"
              name="email"
              value={newUser.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
            {validationErrors.email && (
              <p className="error-message">{validationErrors.email}</p>
            )}
            <label className="text-lg font-bold" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your username"
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
            />
            {validationErrors.username && (
              <p className="error-message">{validationErrors.username}</p>
            )}
            <label className="text-lg font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
            {validationErrors.password && (
              <p className="error-message">{validationErrors.password}</p>
            )}
            <label className="text-lg font-bold" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Confirm your password"
              type="password"
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleInputChange}
            />
            {validationErrors.confirmPassword && (
              <p className="error-message">
                {validationErrors.confirmPassword}
              </p>
            )}
            <label className="text-lg font-bold" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your first name"
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
            {validationErrors.firstName && (
              <p className="error-message">{validationErrors.firstName}</p>
            )}
            <label className="text-lg font-bold" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your last name"
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            {validationErrors.lastName && (
              <p className="error-message">{validationErrors.lastName}</p>
            )}
            <label className="text-lg font-bold" htmlFor="phoneNumber">
              Phone:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your phone number"
              type="tel"
              name="phoneNumber"
              value={newUser.phoneNumber}
              onChange={handleInputChange}
            />
            {validationErrors.phoneNumber && (
              <p className="error-message">{validationErrors.phoneNumber}</p>
            )}
            <div className="mt-2">
              <label className="text-lg font-bold">Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={newUser.dateOfBirth}
                onChange={handleInputChange}
              />
              {validationErrors.dateOfBirth && (
                <p className="error-message">{validationErrors.dateOfBirth}</p>
              )}
            </div>

            <label className="mt-2 text-lg font-bold" htmlFor="citizenId">
              CitizenID:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your CitizenID"
              type="number"
              name="citizenId"
              value={newUser.citizenId}
              onChange={handleInputChange}
            />
            <div className="flex gap-2 mt-2 text-xs">
              <input
                type="radio"
                name="gender"
                value="Male"
                defaultChecked={true}
                onChange={handleInputChange}
              />
              <span className="text-lg">Male</span>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInputChange}
              />
              <span className="text-lg">Female</span>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleInputChange}
              />
              <span className="text-lg">Other</span>
            </div>

            <Button className="w-full px-4 py-2 mt-5 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
              Register
            </Button>
          </form>
          <div className="flex flex-col items-center mt-5">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="text-black hover:text-red-700">
                Login here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
