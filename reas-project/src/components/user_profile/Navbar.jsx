import React from "react";
import { PiListFill } from "react-icons/pi";
import { RiAuctionFill } from "react-icons/ri";
import { FaRegNewspaper } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";

const data = [
  {
    name: "Properties List",
    icon: <PiListFill />,
  },
  {
    name: "Auction Properties",
    icon: <RiAuctionFill />,
  },
  {
    name: "News",
    icon: <FaRegNewspaper />,
  },
  {
    name: "Introduce",
    icon: <GrOverview />,
  },
  {
    name: "Contact",
    icon: <BsFillTelephoneFill />,
  },
];

const Navbar = () => {
  return (
    <>
      <div className="px-5 mx-5 mt-10 rounded-lg bg-primary">
        <ul className="flex items-centertext-white ">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-white transition-all gap-x-2 hover:bg-white hover:text-black"
            >
              <li className="flex items-center p-4 gap-x-2">
                <span>{item.icon}</span>
                <span> {item.name}</span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
