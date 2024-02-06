import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, loginUser } from "../../store/APIRequest";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <>
      <div className="p-10">
        <form onSubmit={handleLogin}>
          <label className="font-bold" htmlFor="username">
            Username
          </label>
          <input
            className="px-4 py-2 ml-3 border rounded-lg outline-none border-slate-400"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="px-4 py-2 mt-5 ml-3 border rounded-lg outline-none border-slate-400"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            className="px-4 py-2 m-5 border rounded-md border-slate-400 bg-slate-300"
            type="submit"
          >
            Continue
          </button>
        </form>
        <span>Don't have an account yet?</span>
        <span className="ml-1 underline">
          <Link to="/register">Register a new account</Link>
        </span>
      </div>
    </>
  );
};

export default Login;
