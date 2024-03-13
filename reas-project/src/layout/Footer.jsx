import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#616161] text-white py-10 mt-auto">
          <div className="container flex flex-wrap mx-auto lg:text-left">
            <div className="w-full lg:w-1/3">
              <h2 className="mb-4 text-2xl font-bold">Đấu giá bất động sản FPT</h2>
              <p>Chúng tôi là điểm đến lý tưởng cho những người đang tìm kiếm cơ hội đầu tư hoặc mua bán bất động sản. Với một nền 
              tảng đầy đủ các tính năng cực kì tiện ích, chúng tôi cung cấp một trải nghiệm đấu giá trực tuyến thuận lợi và an toàn.</p>
            </div>
            <div className="w-full lg:w-1/3 lg:text-center">
              <h2 className="mb-4 text-2xl font-bold">Liên hệ</h2>
              <p>Email: tnsony18@gmail.com</p>
              <p>Phone: +84 906281412</p>
              <p>Địa chỉ: Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức, TP.HCM.</p>
            </div>
            <div className="w-full lg:w-1/3 lg:text-left">
              <h2 className="mb-4 text-2xl font-bold" >Mạng xã hội</h2>
              <div className="flex space-x-4">
                <Link to="https://www.facebook.com/quangphu.le.528" className="text-white hover:text-gray-400">
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link to="" className="text-white hover:text-gray-400">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="" className="text-white hover:text-gray-400">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </div>
            </div>
          </div>


          <div className="pt-8 mt-8 text-center border-t border-gray-600">
            <p>&copy; 2024 Real Estate Auction. FPT University.</p>
          </div>
        </footer>
    </>
  );
};

export default Footer;
