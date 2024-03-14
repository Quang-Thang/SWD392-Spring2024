import React from "react";
import { Link } from "react-router-dom";

const AuctionRoom = () => {
  return (
    <>
      <Link to="/joinroom">
        <button>Join room</button>
      </Link>
    </>
  );
};

export default AuctionRoom;
