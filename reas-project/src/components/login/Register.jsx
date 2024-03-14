import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/APIRequest";
import Input from "./Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

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

  const registerSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .test("isGmail", "Email must end with @gmail.com", (value) =>
        value.endsWith("@gmail.com")
      ),
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username is too long"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@\$!%*#?&]{8,32}$/,
        "Must Contain 8-32 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    citizenId: yup.string().required("CitizenID is required"),
    gender: yup.string().required("Gender is required"), // Or .oneOf(['Male', 'Female'])
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
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
      await registerUser(newUser, dispatch, navigate);
    } catch (error) {
      console.log("Bug at register: ", error.response.data);
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
            Tạo tài khoản của bạn
          </h2>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              dateOfBirth: "",
              gender: "Male",
              citizenId: "",
            }}
            validationSchema={registerSchema}
            onSubmit={async (values) => {
              // Use validated values in your handleRegister function
              const res = registerUser(values, dispatch, navigate);
              // ... Handle success/failure
            }}
          >
            <form onSubmit={handleRegister}>
              <label className="text-lg font-bold" htmlFor="email">
                Email:
              </label>
              <Field
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
              <label className="text-lg font-bold" htmlFor="username">
                Username:
              </label>
              <Field
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
              {/* <input
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              /> */}
              <label className="text-lg font-bold" htmlFor="password">
                Password:
              </label>
              <Field
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              {/* <input
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              <label className="text-lg font-bold" htmlFor="confirmPassword">
                Confirm Password:
              </label>
              <Field
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
              <label className="text-lg font-bold" htmlFor="firstName">
                First Name:
              </label>
              <Field
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="text"
                name="firstName"
                placeholder="Enter your firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500"
              />
              <label className="text-lg font-bold" htmlFor="lastName">
                Last Name:
              </label>
              <Field
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="text"
                name="lastName"
                placeholder="Enter your lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500"
              />
              {/* <DatePicker
                  className="mt-2 ml-2 text-xs rounded outline"
                  selected={birthDate}
                  onChange={(e) => setBirthDate(e)}
                  dateFormat="yyyy-MM-dd"
                /> */}
              <div className="mt-2">
                Date of birth:
                <DatePicker
                  className="mt-2 ml-2 text-xs rounded outline"
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="yyyy-MM-dd"
                />
                <ErrorMessage // Assuming this is still your error component
                  name="dateOfBirth"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <label className="text-lg font-bold" htmlFor="citizenId">
                CitizenID:
              </label>
              <Field
                className="w-full px-4 py-1.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                type="text"
                name="citizenId"
                placeholder="Enter your citizenId"
                value={citizenId}
                onChange={(e) => setCitizenID(e.target.value)}
              />
              <ErrorMessage
                name="citizenId"
                component="div"
                className="text-red-500"
              />
              <div className="flex gap-2 mt-2 text-xs">
                <Field
                  type="radio"
                  name="gender"
                  value="Male"
                  defaultChecked={true}
                  onChange={() => setGender(0)}
                />
                <span className="text-lg">Male</span>
                <Field
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={() => setGender(1)}
                />
                <span className="text-lg">Female</span>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500"
              />
              {/* <div className="flex gap-2 mt-2 text-xs">
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
              </div> */}

              <Button className="w-full px-4 py-2 mt-5 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Register
              </Button>
            </form>
          </Formik>
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
