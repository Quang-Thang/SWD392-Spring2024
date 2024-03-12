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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState(0);
  const [citizenId, setCitizenID] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      dateOfBirth: birthDate,
      gender,
      citizenId,
    };
    const res = registerUser(newUser, dispatch, navigate);
    if (res) {
      console.log("success", newUser);
    } else {
      console.log("failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0 w-1/2">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Your Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center flex-1 flex-shrink-0 w-full p-4 bg-blue-300 border-l border-gray-300">
        <div className="max-w-screen-md p-4 mx-auto text-center border-blue-500 rounded-md">
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
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-lg font-bold" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="text-lg font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-lg font-bold" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="text-lg font-bold" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="text-lg font-bold" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="mt-2">
              Date of birth:
              <DatePicker
                className="mt-2 ml-2 text-xs rounded outline"
                selected={birthDate}
                onChange={(e) => setBirthDate(e)}
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <label className="text-lg font-bold" htmlFor="citizenId">
              CitizenID:
            </label>
            <input
              className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              placeholder="Enter your CitizenID"
              onChange={(e) => setCitizenID(e.target.value)}
            />
            <div className="flex gap-2 mt-2 text-xs">
              <input
                type="radio"
                name="gender"
                value="Male"
                defaultChecked={true}
                onChange={() => setGender(0)}
              />
              <span className="text-lg">Male</span>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={() => setGender(1)}
              />
              <span className="text-lg">Female</span>
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
