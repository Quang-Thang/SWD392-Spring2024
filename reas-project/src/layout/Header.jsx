import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/login/Button";

const HeaderStyles = styled.header`
  padding: 40px 0;
  .header-main {
    display: flex;
    align-items: center;
  }
  .logo {
    display: block;
    width: 150px;
    height: 80px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }
  .search {
    margin-left: auto;
    padding: 15px 25px;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header-button {
    margin-left: 20px;
  }
  .header-auth {
    margin-left: 20px;
  }
`;

const MenuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/post",
    title: "Post",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img
              srcSet="https://seeklogo.com/images/F/fpt-logo-5B8F17203A-seeklogo.com.png"
              alt="real-estate-auction-system"
              className="logo"
            />
          </NavLink>
          <ul className="menu">
            {MenuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="search">
            <input type="text" className="search-input" placeholder="Search" />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.666 12.2964C12.9666 12.1544 13.3701 11.8067 13.4438 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <Button
            className="header-button h-14"
            style={{ maxWidth: "200px", height: "56px" }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
