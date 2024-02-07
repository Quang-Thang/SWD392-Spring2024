import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 4px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className={"logo"}>
        <img
          srcSet="https://seeklogo.com/images/F/fpt-logo-5B8F17203A-seeklogo.com.png"
          alt="real-estate-auction-system"
        ></img>
      </NavLink>
      <h1 className="heading">Oops! Page not found</h1>
      <NavLink to="/" className={"back"}>
        Back to page
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
