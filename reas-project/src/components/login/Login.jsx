import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/APIRequest";
import { useDispatch } from "react-redux";
import InputForm from "./InputForm";
import { auth } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SlReload } from "react-icons/sl";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
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
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
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
    const checkMail = localStorage.getItem(emailRef.current.value);

    setValidationErrors({
      email: emailError,
      password: passwordError,
    });
    if (emailError || passwordError) {
      return; // Stop submission if there are errors
    }

    const newUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    await signInWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async (userCred) => {
        console.log("userCred at login: ", userCred.user.emailVerified);
        if (userCred.user.emailVerified) {
          try {
            await loginUser(newUser, dispatch, navigate);
          } catch (error) {
            console.log("Bug at login: ", error);
          }
        } else {
          toast.error("Người dùng chưa được xác minh");
        }
      })
      .catch((error) => {
        toast.error("Email không tồn tại");
        console.log("Bug at sign in firebase: ", error);
      });

    console.log("checkMail: ", checkMail);
    console.log(newUser.email);
  };

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      console.log(userCred);
      if (userCred.emailVerified) {
        setIsVerified(true);
        localStorage.setItem(emailRef.current.value);
      }
    });
  }, []);

  const handleReload = () => {
    location.reload();
  };

  return (
    <>
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
            <div className="flex items-center justify-end w-full mb-3">
              <SlReload
                size={20}
                onClick={handleReload}
                className="cursor-pointer"
              />
            </div>
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
    </>
  );
};

export default Login;
