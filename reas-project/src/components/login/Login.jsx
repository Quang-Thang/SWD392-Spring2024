import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/APIRequest";
import { useDispatch } from "react-redux";
import InputForm from "./InputForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({
    email: "", // Stores an error message for the email field
    password: "", // Stores an error message for the password field
  });

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email format";
    } else {
      return ""; // No error
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters";
    } else if (password.length > 32) {
      return "Password is exceeded 32 characters";
    } else {
      return ""; // No error
    }
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = validateEmail(emailRef.current.value);
    const passwordError = validatePassword(passwordRef.current.value);

    setValidationErrors({
      email: emailError,
      password: passwordError,
    });
    if (emailError || passwordError) {
      return; // Stop submission if there are errors
    }
    try {
      const newUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await loginUser(newUser, dispatch, navigate);
      console.log("res: ", res);
    } catch (error) {
      console.log("Bug at login: ", error);
    }
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
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
            <InputForm
              placeholder="Email"
              label="email"
              refer={emailRef}
              validationErrors={validationErrors} // Pass the state
            />
            <InputForm
              placeholder="Mật khẩu"
              label="password"
              refer={passwordRef}
              validationErrors={validationErrors}
            />

            <button
              className="w-full px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="flex flex-col items-center mt-5">
            <span>Bạn chưa có tài khoản?</span>
            <div className="mt-2">
              <span className="text-black hover:text-red-700">
                <Link to="/register">Tạo tài khoản mới</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
