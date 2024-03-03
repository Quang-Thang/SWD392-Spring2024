import { useState } from "react";
import Input from "./Input";
import { Button } from "../ui/button";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/APIRequest";

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
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: birthDate,
      gender: gender,
      citizenId: citizenId,
    };
    const res = registerUser(newUser, dispatch, navigate);
    if (res) {
      console.log("success", newUser);
    } else {
      console.log("failed");
    }
  };

  return (
    <div className="flex mt-10">
      <div className="mx-auto w-[800px]">
        <form onSubmit={handleRegister}>
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <Input
            label="First Name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <Input
            label="Last Name"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          Date of birth <br />
          <DatePicker
            className="mt-2 ml-2 rounded outline"
            selected={birthDate}
            onChange={(e) => setBirthDate(e)}
            dateFormat="yyyy-MM-dd"
          />
          <br />
          <Input
            label="CitizenID"
            placeholder="CitizenID"
            onChange={(e) => setCitizenID(e.target.value)}
          />
          <br />
          <div className="flex gap-2 mt-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              defaultChecked={true}
              onChange={() => setGender(0)}
            />
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={() => setGender(1)}
            />
            Female
          </div>
          <br />
          <div className="flex mt-5">
            <Button className="mx-auto" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
