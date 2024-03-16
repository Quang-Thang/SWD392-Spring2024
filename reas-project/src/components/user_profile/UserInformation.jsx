import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import Datepicker from "react-datepicker";
import { PiSignOut } from "react-icons/pi";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaMoneyBill, FaEdit } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const data = [
  {
    name: "Notification",
    icon: <IoNotificationsSharp />,
  },
  {
    name: "Account Information",
    icon: <FaCalendarAlt />,
  },
  {
    name: "My Auction",
    icon: <RiAuctionFill />,
  },
  {
    name: "Auction Property",
    icon: <BsBuilding />,
  },
  {
    name: "Transaction",
    icon: <FaMoneyBill />,
  },
  {
    name: "Logout",
    icon: <PiSignOut />,
  },
];

const UserInformation = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const maxDate = new Date();
  const [isEditing, setIsEditing] = useState(false);

  const validationSchema = Yup.object().shape({
    familyName: Yup.string().required("Family name is required").trim(),
    middleName: Yup.string().trim(),
    lastName: Yup.string().required("Last name is required").trim(),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    telephone: Yup.string().required("Telephone is required").trim(),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .trim(),
    zipCode: Yup.string().required("ZIP Code is required").trim(),
    address: Yup.string().required("Address is required").trim(),
  });

  const initialValues = {
    familyName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    telephone: "",
    email: "",
    zipCode: "",
    address: "",
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="p-3">
        <h1 className="py-2 mx-5 text-2xl text-black border-b-2 border-slate-500">
          Thiết lập tài khoản
        </h1>
      </div>

      <div className="flex mb-10">
        <div className="basis-[20%] bg-primary mx-5 rounded-lg">
          <div className="relative flex flex-col items-center pb-24 text-gray-200">
            <span className="mt-2 text-xl font-semibold">
              {user?.userInfo.username}
            </span>
            <span className="mt-2 text-xl font-semibold">
              {user?.userInfo.role}
            </span>

            <img
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="absolute mx-auto rounded-full w-44 h-44 top-20"
            />
          </div>
          <div className="w-full h-32 bg-white "></div>
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-3 text-white border-t-2 border-gray-200 border-y-4 gap-x-3 hover:bg-white hover:text-black"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="flex basis-[80%]">
          <div className="flex-grow p-8 ml-5 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex justify-between mb-8">
              <h1 className="text-3xl font-semibold text-primary">
                User Information
              </h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-white transition duration-300 border rounded-md bg-primary hover:bg-white hover:text-black hover:border-black border-primary"
                >
                  <FaEdit />
                </button>
              )}
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <div className="grid grid-cols-3 mt-8 gap-x-4">
                      <Field
                        type="text"
                        name="familyName"
                        placeholder="Family name"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <ErrorMessage
                        name="familyName"
                        component="div"
                        className="text-red-500"
                      />
                      <Field
                        type="text"
                        name="middleName"
                        placeholder="Middle name"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <ErrorMessage
                        name="middleName"
                        component="div"
                        className="text-red-500"
                      />
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 mt-8 gap-x-4">
                      <label className="relative">
                        <Datepicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          maxDate={maxDate}
                          placeholderText="Date of Birth"
                          className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                          icon={
                            <FaCalendarAlt className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
                          }
                          readOnly={!isEditing}
                        />
                      </label>
                      <ErrorMessage
                        name="dateOfBirth"
                        component="div"
                        className="text-red-500"
                      />
                      <Field
                        as="select"
                        name="gender"
                        className="px-4 py-3 text-gray-600 border border-gray-300 rounded-md outline-none focus:border-primary"
                        placeholder="Gender"
                        disabled={!isEditing}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500"
                      />
                      <Field
                        type="text"
                        name="telephone"
                        placeholder="Telephone"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <ErrorMessage
                        name="telephone"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 mt-8 gap-x-4">
                      <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="col-span-2 px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
                      />
                      <Field
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <ErrorMessage
                        name="zipCode"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="grid mt-8 gap-x-4">
                      <Field
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    {isEditing && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSave}
                        className="px-6 py-3 text-white transition duration-300 border rounded-lg bg-primary hover:bg-white hover:text-black hover:border-black border-primary"
                        style={{ marginTop: "10px", float: "right" }}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInformation;
