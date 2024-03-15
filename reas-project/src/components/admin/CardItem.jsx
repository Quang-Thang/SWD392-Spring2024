import clsx from "clsx";
import { FaUserCircle } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CardItem = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex gap-2 p-6 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex flex-col flex-1 gap-2">
              <h2 className="text-[#777c84] text-[18px] font-bold flex-1">
                {item.title}
              </h2>
              <p className="text-6xl font-black text-black">{item.value}</p>
            </div>
            <div
              className={cn(
                "p-4 rounded-full mx-4 h-20 aspect-square flex items-center justify-center ",
                getColor(index)
              )}
            >
              {item.type === "user" ? (
                <FaUserCircle size={30} color="#fff" />
              ) : (
                <RiMoneyDollarCircleFill size={33} color="#fff" />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardItem;

const getColor = (index) => {
  const colors = [
    "bg-[#F04337]",
    "bg-[#11B981]",
    "bg-[#F79007]",
    "bg-[#6366F1]",
  ];
  return colors[index];
};
