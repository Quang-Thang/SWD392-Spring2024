import React from "react";

const CardItem = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-6 border rounded-lg">
            <h2 className="text-gray-800 text-lg font-semibold">
              {item.title}
            </h2>
            <p className="text-gray-600 text-2xl">{item.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardItem;
