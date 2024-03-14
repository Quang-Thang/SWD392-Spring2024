import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/APIRequest";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .test("isGmail", "Email must end with @gmail.com", (value) =>
        value.endsWith("@gmail.com")
      ),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/,
        "Must Contain 8-32 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: email,
        password: password,
      };
      const res = await loginUser(newUser, dispatch, navigate);
      console.log("res: ", res);
    } catch (error) {
      console.log("Bug at login: ", error);
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

      <div className="relative flex items-center justify-center flex-shrink-0 w-1/2 p-10 bg-blue-300 border-l border-gray-300">
        <div className="absolute p-2 transform -translate-x-1/2 bg-blue-300 rounded-md top-20 left-1/2"></div>
        <div className="max-w-xl p-8 mt-10 text-center bg-white border border-blue-500 rounded-md">
          <h2 className="text-2xl font-bold text-gray-500">
            Welcome to our Real Estate Auction!
          </h2>
          <h3 className="text-gray-400 text-1xl">
            Please sign-in to your account and start an auction
          </h3>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              // Replace your existing handleLogin logic to use values from the Formik form
              try {
                const newUser = values; // values now contain validated data
                const res = await loginUser(newUser, dispatch, navigate);
                console.log("res: ", res);
              } catch (error) {
                console.log("Bug at login: ", error);
              }
            }}
          >
            <form
              onSubmit={handleLogin}
              className="flex flex-col items-start space-y-5"
            >
              <label className="text-lg font-bold" htmlFor="email">
                Email:
              </label>
              <Field
                className="w-full px-4 py-2 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
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
              <label className="text-lg font-bold" htmlFor="password">
                Mật khẩu:
              </label>
              <Field
                className="w-full px-4 py-2 border border-blue-500 border-solid rounded-md outline-none focus:border-blue-700"
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

              <button
                className="w-full px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Login
              </button>
            </form>
          </Formik>
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
