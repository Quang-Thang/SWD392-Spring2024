import ContactItem from "../components/contact/ContactItem";
import React from "react";
import { GiPositionMarker } from "react-icons/gi";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import InputForm from "../components/contact/InputForm";

const Contact = () => {
  return (
    <>
      <div className="mt-10 px-28">
        <h1 className="mb-10 text-3xl font-bold">Liên hệ</h1>
        <div className="grid grid-cols-3 gap-8 pt-5 border-t-2">
          <ContactItem
            icon={<GiPositionMarker size={50} color="red" />}
            title="Địa chỉ"
          >
            Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Tp. Thủ Đức,
            TP.HCM.
          </ContactItem>
          <ContactItem
            icon={<FaPhoneFlip size={50} color="red" />}
            title="Số điện thoại"
          >
            024.32.115.234
          </ContactItem>

          <ContactItem icon={<IoIosMail size={50} color="red" />} title="Mail">
            reas@gmail.com
          </ContactItem>
        </div>

        <div className="flex items-center justify-center p-5 mt-10 rounded-lg contact-box">
          <div>
            <h1 className="mb-10 text-3xl font-semibold">Liên hệ</h1>
            <p className="text-gray-600">
              Vui lòng điền thông tin vào các ô bên dưới, chúng tôi sẽ liên lạc
              và phản hồi lại quý khách
            </p>
            <div className="">
              <InputForm placeholder="Họ tên" />
              <InputForm placeholder="Email" />
              <InputForm placeholder="Số điện thoại" />
              <InputForm placeholder="Nơi công tác" />
            </div>
            <button className="px-5 py-2 text-xl font-bold text-white rounded-lg bg-primary">
              Gửi Yêu Cầu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
