import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Button>
          <Link to="/login">Login</Link>
        </Button>
        <Button>
          {" "}
          <Link to="/register">Register</Link>
        </Button>
        <Button>
          <Link to="/admin">Admin</Link>
        </Button>
      </div>
    </>
  );
};

export default HomePage;
