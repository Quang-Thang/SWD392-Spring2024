import React from "react";
import styled from "styled-components";
import Loading from "./Loading";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  font-weight: 600;
  font-size: 16px;
  width: 100%;
  height: ${(props) => props.height || "66px"};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  return (
    <ButtonStyles
      type={type}
      onClick={onClick}
      {...props}
      className="rounded-lg max-w-96 my-0 mx-auto"
    >
      {child}
    </ButtonStyles>
  );
};

export default Button;
