import React, { useState, useEffect } from 'react';

const PostDetail = () => {
  const [inputDate, setInputDate] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);

  const handleCountdownStart = () => {
    setCountdownRunning(true);
  };

  useEffect(() => {
    let countdownInterval;

    const handleCountdown = () => {
      const targetDate = new Date(inputDate);

      if (targetDate.getTime() < new Date().getTime()) {
        console.error('Please enter a future date and time for the countdown.');
        setCountdownRunning(false);
        return; 
      }
      const remainingTime = targetDate.getTime() - new Date().getTime();

      const positiveRemainingTime = Math.max(remainingTime, 0);

      setDays(Math.floor(positiveRemainingTime / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((positiveRemainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((positiveRemainingTime % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((positiveRemainingTime % (1000 * 60)) / 1000));
    };

    if (countdownRunning) {
      handleCountdown();
      countdownInterval = setInterval(handleCountdown, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [countdownRunning, inputDate]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-center bg-gray-100" style={{ height: "450px", marginLeft: "20px", marginBottom: "10px" }}>
        <img src="https://cafefcdn.com/thumb_w/640/203337114487263232/2024/3/9/eecucion-hipotecaria-e1452163635222-700x441thel-urnq-17099792165412992874-0-0-437-700-crop-17099792199991846073919.jpg" alt="Image description" />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <span>Nhập thời gian đếm ngược tới ngày đấu giá:</span>
          <input type="datetime-local" value={inputDate} onChange={(e) => setInputDate(e.target.value)} style={{ backgroundColor: '#E5E7EB', marginBottom: "10px" }} />
          <button onClick={handleCountdownStart}>Đếm ngược</button>
        </div>
        <div className="flex flex-wrap items-center justify-center bg-gray-200 " style={{ height: "50px", marginRight: "20px" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Ngày:</span>
            <input type="text" style={{ margin: '0 10px', width: '50px' }} value={days} readOnly />
            <span style={{ marginRight: '10px' }}>Giờ:</span>
            <input type="text" style={{ margin: '0 10px', width: '50px' }} value={hours} readOnly />
            <span style={{ marginRight: '10px' }}>Phút:</span>
            <input type="text" style={{ margin: '0 10px', width: '50px' }} value={minutes} readOnly />
            <span style={{ marginRight: '10px' }}>Giây:</span>
            <input type="text" style={{ margin: '0 10px', width: '50px' }} value={seconds} readOnly />
          </div>
        </div>
        <div className="flex flex-wrap items-center p-4 mt-1 bg-gray-100 h-450px mr-20px">
          <div className="flex flex-col">
            <div className="mb-2">Mã tài sản:</div>
            <div className="mb-2">Thời gian mở đăng ký:</div>
            <div className="mb-2">Thời gian kết thúc đăng ký:</div>
            <div className="mb-2">Giá khởi điểm:</div>
            <div className="mb-2">Phí tham gia đấu giá:</div>
            <div className="mb-2">Bước giá:</div>
            <div className="mb-2">Số bước giá tối đa:</div>
            <div className="mb-2">Tiền đặt trước:</div>
            <div className="mb-2">Phương thức đấu giá:</div>
            <div className="mb-2">Tên chủ tài sản:</div>
            <div className="mb-2">Nơi xem tài sản:</div>
            <div className="mb-2">Thời gian xem tài sản:</div>
            <div className="mb-2">Thời gian bắt đầu trả giá:</div>
            <div className="mb-2">Thời gian kết thúc trả giá:</div>
          </div>
          <div className="ml-auto whitespace-normal">
            <div className="mb-2">MTS-XRMQ8D</div>
            <div className="mb-2">02/02/2024 8:00:00</div>
            <div className="mb-2">12/03/2024 16:30:00</div>
            <div className="mb-2">3.00%</div>
            <div className="mb-2">8.000.000 VNĐ</div>
            <div className="mb-2">0.5%</div>
            <div className="mb-2">10 bước giá </div>
            <div className="mb-2">1.000.000.000 VNĐ</div>
            <div className="mb-2">Trả giá lên và liên tục</div>
            <div className="mb-2">Phú</div>
            <div className="mb-2">Tại nơi có tài sản</div>
            <div className="mb-2">Trong giờ hành chính</div>
            <div className="mb-2">15/03/2024 09:00:00</div>
            <div className="mb-2">15/03/2024 10:00:00</div>
          </div>
        </div>
        <div className="flex justify-center">
  <button style={{ backgroundColor: '#b30000', color: 'white', padding: '6px 16px', borderRadius: '4px', width: '600px', marginTop:"10px", fontWeight: 'bold',marginBottom:"10px" }}>Đăng ký tham gia đấu giá</button>
</div>
      </div>
    </div>
  );
}

export default PostDetail;