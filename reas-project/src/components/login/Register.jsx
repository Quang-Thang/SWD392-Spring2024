import { Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Label from "./Label";
import Input from "./Input";
import { useForm } from "react-hook-form";
import IconEyeClose from "./IconEyeClose";
import Field from "./Field";
import IconEyeOpen from "./IconEyeOpen";
import Button from "./Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const RegisterStyles = styled.div`
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

const schema = yup
  .object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .required("Please enter your password"),
    address: yup.string().required("Please enter your address"),
  })
  .shape({
    phone: yup
      .string()
      .required("Please enter your phone number")
      .matches(
        /(?:\d{1,3}[- ]?)?\d{10}$/,
        "Invalid phone number format. Please use the format: 1234567890"
      ),
  });
const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleRegister = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };
  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <RegisterStyles>
      <div className="container">
        <img srcSet="/vite.svg" alt="auction-system" className="logo" />
        <h1 className="heading">Auction System</h1>
        <form
          className="mx-0 my-auto max-w-4xl"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Field>
            <Label htmlFor="fullname">FullName</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            />
          </Field>
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
          <Field>
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              name="address"
              placeholder="Enter your address"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              control={control}
            />
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Register
          </Button>
        </form>
      </div>
    </RegisterStyles>
  );
};

export default Register;
