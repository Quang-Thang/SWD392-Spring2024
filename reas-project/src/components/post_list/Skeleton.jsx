import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="w-full bg-slate-50 rounded-2xl shadow-xl mb-10 sm:w-[300px] md:flex md:flex-col">
        <div className="relative h-[250px] md:h-auto">
          <img
            src=""
            alt=""
            className="w-full h-full rounded-tl-2xl rounded-tr-2xl"
          />
          <span className="absolute w-auto px-4 py-2 text-xl font-bold rounded-full bottom-5 left-12 bg-slate-100">
            {/* {post.startTime} */}
          </span>
        </div>
        <div className="p-5">
          {/* <h1 className="text-2xl font-semibold">{post.title}</h1> */}
          <h1 className="my-3 text-gray-600">
            Trạng thái:{" "}
            {/* <span className="font-bold text-red-500">{post.status}</span> */}
          </h1>
          {/* <DetailButton id={post.id} /> */}
        </div>
      </div>
    </>
  );
};

export default Skeleton;
