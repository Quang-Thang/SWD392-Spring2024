import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#121212] text-white py-10 mt-auto">
        <div className="container flex flex-wrap mx-auto">
          <div className="w-full mb-6 lg:w-1/3 lg:mb-0">
            <h2 className="mb-4 text-2xl font-bold">About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className="w-full mb-6 lg:w-1/3 lg:mb-0">
            <h2 className="mb-4 text-2xl font-bold">Contact</h2>
            <p>Email: </p>
            <p>Phone: +84 906281412</p>
          </div>

          <div className="w-full lg:w-1/3">
            <h2 className="mb-4 text-2xl font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Twitter
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-gray-600">
          <p>&copy; 2024 Real Estate Auction. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
