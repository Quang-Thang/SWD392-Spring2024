import React, { useEffect, useState } from "react";
import DetailButton from "./DetailButton";
import { getAllPost } from "../../services/PostService";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

// const data = [
//   {
//     id: 1,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 9",
//     status: "Chưa diễn ra",
//     startTime: "23/03/2024 08:30:00",
//   },
//   {
//     id: 2,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 12",
//     status: "Đang diễn ra",
//     startTime: "23/03/2024 10:30:00",
//   },
//   {
//     id: 3,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 7",
//     status: "Chưa diễn ra",
//     startTime: "23/03/2024 09:30:00",
//   },

//   {
//     id: 4,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 12",
//     status: "Đang diễn ra",
//     startTime: "23/03/2024 10:30:00",
//   },
//   {
//     id: 5,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 7",
//     status: "Chưa diễn ra",
//     startTime: "23/03/2024 09:30:00",
//   },
//   {
//     id: 6,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 9",
//     status: "Chưa diễn ra",
//     startTime: "23/03/2024 08:30:00",
//   },
//   {
//     id: 7,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 12",
//     status: "Đang diễn ra",
//     startTime: "23/03/2024 10:30:00",
//   },
//   {
//     id: 8,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 7",
//     status: "Chưa diễn ra",
//     startTime: "23/03/2024 09:30:00",
//   },
//   {
//     id: 9,
//     img: "https://cdn.pixabay.com/photo/2023/12/07/23/51/gavel-8436504_1280.jpg",
//     link: "burh",
//     title: "Bán nhà quận 9",
//     status: "Chưa diễn ra",
//     startTime: "23/03/2024 08:30:00",
//   },
// ];
const PostItem = ({ searchValue, upcoming, ongoing, over }) => {
  const [postList, setPostList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  console.log("Upcoming: ", upcoming);

  const apiEndpoint =
    "https://65f0656dda8c6584131b9b74.mockapi.io/api/RealEstate";
  useEffect(() => {
    try {
      axios.get(apiEndpoint).then((response) => {
        const res = response.data;
        setPostList(res);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  // Filter posts if searchValue exists
  const filteredPosts = searchValue
    ? postList.filter((post) => {
        // Customize your filtering logic here
        const titleMatch = post.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        // You can add more fields with additional logic if needed
        return titleMatch;
      })
    : postList.filter((post) => {
        if (upcoming && post.status === "Sắp diễn ra") {
          return post.status === "Sắp diễn ra";
        }
        if (ongoing && post.status === "Đang diễn ra") {
          return post.status === "Đang diễn ra";
        }
        if (over && post.status === "Đã thanh lý") {
          return post.status === "Đã thanh lý";
        }
        if (!upcoming && !ongoing && !over) {
          return true;
        }
      });

  return (
    <>
      <div className="grid grid-cols-3 ">
        {isLoading ? (
          <div className="w-10 h-10 mx-auto mb-10 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={index}
              className="w-full bg-slate-50 rounded-2xl shadow-xl mb-10 sm:w-[300px] md:flex md:flex-col"
            >
              <div className="relative h-[250px] md:h-auto">
                <img
                  src={post.imageUrl || <Skeleton count={10} height={30} />}
                  alt=""
                  className="w-full h-full rounded-tl-2xl rounded-tr-2xl"
                />
                {post.status === "Đã thanh lý" ? (
                  <span className="absolute w-auto px-4 py-2 text-xl font-bold -translate-x-1/2 rounded-full select-none bottom-5 left-1/2 bg-slate-100">
                    Đã kết thúc
                  </span>
                ) : post.status === "Đang diễn ra" ? (
                  <span className="absolute w-auto px-4 py-2 text-xl font-bold text-yellow-300 -translate-x-1/2 bg-red-700 rounded-full select-none bottom-5 left-1/2 animate-pulse">
                    Đang diễn ra
                  </span>
                ) : (
                  <span className="absolute min-w-[215px] text-center px-4 py-2 text-xl font-bold -translate-x-1/2 rounded-full bottom-5 left-1/2 bg-slate-100 select-none">
                    {post.startTime || <Skeleton count={10} height={30} />}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h1 className="text-2xl font-semibold">
                  {post.title || <Skeleton count={10} height={30} />}
                </h1>
                <h1 className="my-3 text-gray-600">
                  Trạng thái:{" "}
                  <span className="font-bold text-red-500">
                    {post.status || <Skeleton count={10} height={30} />}
                  </span>
                </h1>
                <DetailButton
                  id={post.id || <Skeleton count={10} height={30} />}
                />
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>Hiện tại chưa có tài sản bạn tìm kiếm</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default PostItem;
