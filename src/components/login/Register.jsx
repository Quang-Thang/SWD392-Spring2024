import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/APIRequest";
import { Button } from "../ui/button";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        "Must Contain 8-32 Characters, One Uppercase, One Number and One Special Character"
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
    phone: yup.string().required("Phone is required"),
  });

  const handleRegister = async (values) => {
    try {
      await registerUser(values, dispatch, navigate);
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
              phone: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-lg font-bold" htmlFor="email">
                    Email:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-bold" htmlFor="username">
                    Username:
                  </label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-lg font-bold" htmlFor="password">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-lg font-bold"
                  htmlFor="confirmPassword"
                >
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-lg font-bold" htmlFor="firstName">
                    First Name:
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Enter your firstName"
                    className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-bold" htmlFor="lastName">
                    Last Name:
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Enter your lastName"
                    className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-lg font-bold" htmlFor="dateOfBirth">
                    Date of birth:
                  </label>
                  <Field name="dateOfBirth">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) =>
                          form.setFieldValue(field.name, date)
                        }
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-bold" htmlFor="citizenId">
                    CitizenID:
                  </label>
                  <Field
                    type="text"
                    name="citizenId"
                    placeholder="Enter your citizenId"
                    className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                  />
                  <ErrorMessage
                    name="citizenId"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="mb-4">
  <div className="flex items-center gap-2 mt-2 text-xs">
    <span className="text-lg font-bold">Gender:</span>
    <label className="flex items-center" style={{ fontSize: "1rem" }}>
      <Field
        type="radio"
        name="gender"
        value="Male"
        className="mr-1"
        style={{ transform: "scale(1)" }}
      />
      <span>Male</span>
    </label>
    <label className="flex items-center" style={{ fontSize: "1rem" }}>
      <Field
        type="radio"
        name="gender"
        value="Female"
        className="mr-1"
        style={{ transform: "scale(1)" }}
      />
      <span>Female</span>
    </label>
    <label className="flex items-center" style={{ fontSize: "1rem" }}>
      <Field
        type="radio"
        name="gender"
        value="Other"
        className="mr-1"
        style={{ transform: "scale(1)" }}
      />
      <span>Other</span>
    </label>
  </div>
  <ErrorMessage
    name="gender"
    component="div"
    className="text-red-500"
  />
</div>

              <div className="mb-4">
                <label className="text-lg font-bold" htmlFor="phone">
                  Phone:
                </label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-0.5 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full px-4 py-0.5 mt-5 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Register
              </Button>
            </Form>
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
