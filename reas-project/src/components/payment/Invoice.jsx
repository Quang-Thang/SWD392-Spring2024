import React from "react";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const { now, amount, userName, formatedDate, title } = location.state || "";
  console.log(title);
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <>
      <div className="p-8 mx-auto">
        {/* Header */}
        <div className="p-5 mb-6 border rounded-xl">
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold">Công ty TNHH CPP</h1>
            <img
              src="https://cdn.discordapp.com/attachments/1192751698825977880/1218439887204782120/image2-removebg-preview.png?ex=6607ab92&is=65f53692&hm=772369cfa91037bf0abe5602ca00b21634368ec5aa13bd790bdb2fa7736d24f7&"
              alt="logo"
              className="w-[200px] h-[100px] mx-auto"
            />
            <h2 className="text-2xl font-bold">Hóa đơn điện tử</h2>
          </div>
          <div className="mt-5">
            <p className="text-xl font-semibold">Ngày: {formatedDate}</p>
            <p className="text-xl font-semibold">Người gửi: Công ty TNHH CPP</p>
          </div>
          <div className="my-4">
            <h2>Thân gửi, {userName}</h2>
            <p className="my-5">
              Cảm ơn, bạn đã tham gia và sử dụng dịch vụ của chúng tôi.
            </p>
            <p>
              Đây là hóa đơn từ việc thanh toán bất động sản mà bạn đã đấu giá.
            </p>
          </div>
          <div>
            <table className="w-full border border-collapse table-auto border-slate-400">
              <tbody>
                <tr>
                  <th className="p-2 text-left border border-slate-300">
                    Tên Bất Động Sản
                  </th>
                  <td className="p-2 border border-slate-300">{title}</td>
                </tr>

                <tr>
                  <th className="p-2 text-left border border-slate-300">
                    Thời gian đấu giá
                  </th>
                  <td className="p-2 border border-slate-300">
                    {formatedDate}
                  </td>
                </tr>
                <tr>
                  <th className="p-2 text-left border border-slate-300">Giá</th>
                  <td className="p-2 border border-slate-300">
                    {formatter.format(amount)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-5">
              <p>
                Một lần nữa xin cảm ơn bạn vì đã đặt niềm tin vào công ty chúng
                tôi.
              </p>
              <p className="my-5">Chúc bạn một ngày tốt lành.</p>
              <p>Mọi thắc mắc xin vui lòng liên hệ SĐT: 0908079999</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
