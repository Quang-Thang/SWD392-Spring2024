import React from "react";
import { Link } from "react-router-dom";
import HomepageLayout from "../layout/HomepageLayout";
import HomeBanner from "../modules/home/HomeBanner";
import HomeFeature from "../modules/home/HomeFeature";
import HomeNewest from "../modules/home/HomeNewest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  return (
    <>
      <HomepageLayout>
        <HomeBanner />
        <HomeFeature />
        <HomeNewest />
        {/* Nội dung footer */}
        <footer className="bg-[#515050] text-white py-10">
  <div className="container flex justify-between mx-auto">
    <div className="w-full mb-6 lg:w-1/3 lg:mb-0">
              <h2 className="mb-4 ml-auto text-2xl font-bold">About Us</h2>
              <p>This is where you can comfortably bid and buy real estate listed on the market legally. 
                Always bring:</p>
              <p>- Comfortable</p>
              <p>- Easy to use</p>
              <p>- Completely safe</p>
            </div>

            <div className="w-full mb-6 ml-20 lg:w-1/3 lg:mb-0"> {/* Thay đổi ml-5 thành ml-10 hoặc thêm style={{ marginLeft: '10px' }} */}
  <h2 className="mb-4 text-2xl font-bold">Contact Us</h2>
  <p>Email: </p>
  <p>Phone: +84 906281412</p>
</div>
            <div className="w-full ml-auto lg:w-1/3"> {/* Thêm ml-auto để kéo sang phải */}
      <h2 className="mb-4 text-2xl font-bold">Quick Link</h2>
      <div className="flex space-x-4">
      <a href="https://www.facebook.com/quangphu.le.528" className="text-white hover:text-gray-400">
    <FontAwesomeIcon icon={faFacebook} />
  </a>
  <a href="#" className="text-white hover:text-gray-400">
    <FontAwesomeIcon icon={faInstagram} />
  </a>
  <a href="#" className="text-white hover:text-gray-400">
    <FontAwesomeIcon icon={faTwitter} />
  </a>
</div>


        </div>
        </div>

      <div className="pt-8 mt-8 text-center border-t border-gray-600">
        <p>&copy; 2024 Real Estate Auction. FPT University.</p>
      </div>
    </footer>
      </HomepageLayout>
      {/* Các nút chuyển trang */}
      {/* <div className="flex items-center justify-between">
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
      </div> */}
    </>
  );
};

export default HomePage;