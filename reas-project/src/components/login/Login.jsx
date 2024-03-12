import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/APIRequest";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    const res = loginUser(newUser, dispatch, navigate);
    console.log("res: ", res);
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

      <div className="relative flex items-center justify-center flex-shrink-0 w-1/2 p-10 bg-blue-300 border-l border-gray-300">
        <div className="absolute p-2 transform -translate-x-1/2 bg-blue-300 rounded-md top-20 left-1/2"></div>
        <div className="max-w-xl p-8 mt-10 text-center bg-white border border-blue-500 rounded-md">
          <h2 className="text-2xl font-bold text-gray-500">
            Welcome to our Real Estate Auction!
          </h2>
          <h3 className="text-gray-400 text-1xl">
            Please sign-in to your account and start an auction
          </h3>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-start space-y-5"
          >
            <label className="text-lg font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full px-4 py-2 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-lg font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full px-4 py-2 mt-1 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="flex flex-col items-center mt-5">
            <span>Don't have an account ?</span>
            <div className="mt-2">
              <span className="text-black hover:text-red-700">
                <Link to="/register">Create an account</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
