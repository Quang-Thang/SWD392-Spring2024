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

const data = [
  {
    name: "Danh sách cuộc đấu giá đã đăng ký",
    icon: <RiAuctionFill />,
  },
  {
    name: "Lịch sử giao dịch",
    icon: <FaMoneyBill />,
  },
  {
    name: "Đăng xuất",
    icon: <PiSignOut />,
  },
];

const UserInformation = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const maxDate = new Date();
  const [isEditing, setIsEditing] = useState(false);

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
              src="https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png"
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
                      <Field
                        type="text"
                        name="middleName"
                        placeholder="Middle name"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
                      />
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
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
                      <Field
                        type="text"
                        name="telephone"
                        placeholder="Telephone"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
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
                      <Field
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        className="px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary"
                        readOnly={!isEditing}
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
