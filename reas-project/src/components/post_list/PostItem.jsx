import React from "react";
import DetailButton from "./DetailButton";

const data = [
  {
    id: 1,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 9",
    status: "Chưa diễn ra",
    startTime: "23/03/2024 08:30:00",
  },
  {
    id: 2,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 12",
    status: "Đang diễn ra",
    startTime: "23/03/2024 10:30:00",
  },
  {
    id: 3,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 7",
    status: "Chưa diễn ra",
    startTime: "23/03/2024 09:30:00",
  },

  {
    id: 4,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 12",
    status: "Đang diễn ra",
    startTime: "23/03/2024 10:30:00",
  },
  {
    id: 5,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 7",
    status: "Chưa diễn ra",
    startTime: "23/03/2024 09:30:00",
  },
  {
    id: 6,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 9",
    status: "Chưa diễn ra",
    startTime: "23/03/2024 08:30:00",
  },
  {
    id: 7,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 12",
    status: "Đang diễn ra",
    startTime: "23/03/2024 10:30:00",
  },
  {
    id: 8,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 7",
    status: "Chưa diễn ra",
    startTime: "23/03/2024 09:30:00",
  },
  {
    id: 9,
    img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
    link: "burh",
    title: "Bán nhà quận 9",
    status: "Chưa diễn ra",
    startTime: "23/03/2024 08:30:00",
  },
];
const PostItem = () => {
  return (
    <>
      <div className="grid grid-cols-3 ">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="w-[300px] h-auto bg-slate-50 rounded-2xl shadow-xl mb-10"
            >
              <div className="relative h-[250px]">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full rounded-tl-2xl rounded-tr-2xl"
                />
                <span className="absolute w-auto px-4 py-2 text-xl font-bold rounded-full bottom-5 left-12 bg-slate-100">
                  {item.startTime}
                </span>
              </div>
              <div className="p-5">
                <h1 className="text-2xl font-semibold">{item.title}</h1>
                <h1 className="my-3 text-gray-600">
                  Trạng thái:{" "}
                  <span className="font-bold text-red-500">{item.status}</span>
                </h1>
                <DetailButton id={item.id} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PostItem;
