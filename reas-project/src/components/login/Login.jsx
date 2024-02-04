import { Link } from "react-router-dom";
import { React, useState } from "react";
import styled from "styled-components";
import Label from "./Label";
import Input from "./Input";
import { useForm } from "react-hook-form";
import IconEyeClose from "./IconEyeClose";
import Field from "./Field";
import IconEyeOpen from "./IconEyeOpen";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Button from "./Button";
const LoginStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-size: 40px;
    margin-bottom: 60px;
    font-weight: bold;
  }
`;
const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});
const Login = () => {
  const {
    control,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <LoginStyles>
      <div className="container">
        <img srcSet="/vite.svg" alt="auction-system" className="logo" />
        <h1 className="heading">Auction System</h1>
        <form className="mx-0 my-auto max-w-4xl">
          <Field>
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type={togglePassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {!togglePassword ? (
                <IconEyeClose
                  onClick={() => setTogglePassword(true)}
                ></IconEyeClose>
              ) : (
                <IconEyeOpen
                  onClick={() => setTogglePassword(false)}
                ></IconEyeOpen>
              )}
            </Input>
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Login
          </Button>
        </form>
      </div>
    </LoginStyles>
  );
};

export default Login;
