import { getPostById } from "../services/PostService";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";
import moment from "moment";

const PostDetail = () => {
  const [inputDate, setInputDate] = useState("2024-03-22T00:19");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const location = useLocation();
  const { postId } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [realEstateInfo, setRealEstateInfo] = useState();

  console.log("Post id at post detail: ", postId);

  const handleCountdownStart = () => {
    setCountdownRunning(true);
  };

  const getRealEstatePostById = async () => {
    try {
      const res = await getPostById(postId);
      if (res) {
        setRealEstateInfo(res.data.data);
        console.log("Res in post detail: ", res.data);
        setIsLoading(false);
      } else {
        console.log("Fetch failed");
      }
    } catch (error) {
      console.log("Bug at post detail: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRealEstatePostById();
  }, []);

  useEffect(() => {
    let countdownInterval;

    const handleCountdown = () => {
      const targetDate = new Date(realEstateInfo?.registrationPeriodStart);

      if (targetDate.getTime() < new Date().getTime()) {
        console.error("Please enter a future date and time for the countdown.");
        setCountdownRunning(false);
        return;
      }
      const remainingTime = targetDate.getTime() - new Date().getTime();

      const positiveRemainingTime = Math.max(remainingTime, 0);

      setDays(Math.floor(positiveRemainingTime / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor(
          (positiveRemainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
      );
      setMinutes(
        Math.floor((positiveRemainingTime % (1000 * 60 * 60)) / (1000 * 60))
      );
      setSeconds(Math.floor((positiveRemainingTime % (1000 * 60)) / 1000));
    };

    if (countdownRunning) {
      handleCountdown();
      countdownInterval = setInterval(handleCountdown, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [countdownRunning, inputDate]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[50vh]">
          <div className="w-20 h-20 mx-auto mb-10 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : postId ? (
        <div className="grid grid-cols-2 gap-4">
          <div
            className="flex items-center justify-center bg-gray-100"
            style={{
              marginLeft: "20px",
              marginBottom: "10px",
              padding: "1rem",
            }}
          >
            <img
              src={realEstateInfo?.thumbnail}
              alt="Image description"
              className="rounded-lg 650px"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span>Nhập thời gian đếm ngược tới ngày đấu giá:</span>
              <input
                type="datetime-local"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                style={{ backgroundColor: "#E5E7EB", marginBottom: "10px" }}
              />
              <button onClick={handleCountdownStart}>Đếm ngược</button>
            </div>
            <div
              className="flex flex-wrap items-center justify-center bg-gray-200 "
              style={{ height: "50px", marginRight: "20px" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>Ngày:</span>
                <input
                  type="text"
                  style={{ margin: "0 10px", width: "50px" }}
                  value={days}
                  readOnly
                />
                <span style={{ marginRight: "10px" }}>Giờ:</span>
                <input
                  type="text"
                  style={{ margin: "0 10px", width: "50px" }}
                  value={hours}
                  readOnly
                />
                <span style={{ marginRight: "10px" }}>Phút:</span>
                <input
                  type="text"
                  style={{ margin: "0 10px", width: "50px" }}
                  value={minutes}
                  readOnly
                />
                <span style={{ marginRight: "10px" }}>Giây:</span>
                <input
                  type="text"
                  style={{ margin: "0 10px", width: "50px" }}
                  value={seconds}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center p-4 bg-gray-100 h-450px mr-20px">
              <div className="flex flex-col">
                <div className="mb-2">Mã tài sản:</div>
                <div className="mb-2">Thời gian mở đăng ký:</div>
                <div className="mb-2">Thời gian kết thúc đăng ký:</div>
                <div className="mb-2">Giá khởi điểm:</div>
                <div className="mb-2">Bước giá:</div>
                <div className="mb-2">Tên chủ tài sản:</div>
                <div className="mb-2">Tên chủ trì:</div>
                <div className="mb-2">Địa chỉ:</div>
                <div className="mb-2">Thời gian bắt đầu trả giá:</div>
                <div className="mb-2">Thời gian kết thúc trả giá:</div>
              </div>
              <div className="ml-auto whitespace-normal">
                <div className="mb-2">{realEstateInfo?.auctionId}</div>
                <div className="mb-2">
                  {moment(realEstateInfo?.registrationPeriodStart).format(
                    "YYYY-MM-DD h:mm:ss A"
                  )}
                </div>
                <div className="mb-2">
                  {moment(realEstateInfo?.registrationPeriodEnd).format(
                    "YYYY-MM-DD h:mm:ss A"
                  )}
                </div>
                <div className="mb-2">{realEstateInfo?.initialPrice} VNĐ</div>
                <div className="mb-2">{realEstateInfo?.incrementalPrice}</div>
                <div className="mb-2">{realEstateInfo?.owner.fullName}</div>
                <div className="mb-2">Admin</div>
                <div className="mb-2">{realEstateInfo?.address}</div>
                <div className="mb-2">
                  {moment(realEstateInfo?.auctionPeriodStart).format(
                    "YYYY-MM-DD h:mm:ss A"
                  )}
                </div>
                <div className="mb-2">
                  {moment(realEstateInfo?.auctionPeriodEnd).format(
                    "YYYY-MM-DD h:mm:ss A"
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link to="/joinroom">
                <button
                  style={{
                    backgroundColor: "#b30000",
                    color: "white",
                    padding: "6px 16px",
                    borderRadius: "4px",
                    width: "600px",
                    marginTop: "10px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Đăng ký tham gia đấu giá
                </button>
              </Link>
              <JoinRoom realEstateId={postId} realEstateInfo={realEstateInfo} />
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <h1 className="text-2xl font-semibold ">
            Bài viết hiện đã không còn tồn tại
          </h1>
          <Link to="/postList">
            <span className="italic text-blue-500 underline">
              Nhấp vào đây để quay lại
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default PostDetail;
