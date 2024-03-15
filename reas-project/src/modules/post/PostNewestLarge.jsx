import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const PostNewestLargeStyles = styled.div`
  .post-image {
    display: block;
    margin-bottom: 16px;
    height: 433px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
  .post-category {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 8px;
    color: #6b6b6b;
    font-size: 14px;
    font-weight: 600;
    background-color: #f3edff;
    margin-bottom: 16px;
  }
  .post-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    margin-left: auto;
  }
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
  .post-title {
    font-weight: bold;
    line-height: 1.5;
    display: block;
    font-size: 22px;
    margin-bottom: 12px;
  }
`;

const PostNewestLarge = () => {
  return (
    <PostNewestLargeStyles>
      <div className="post-image">
        <img
          srcSet="https://file4.batdongsan.com.vn/crop/492x273/2024/02/02/20240202120113-1fb2_wm.jpg"
          alt="post-newest-large"
        />
      </div>
      <div className="post-category">Sắp diễn ra</div>
      <h3 className="post-title">Đất kinh doanh trung tâm quận 1</h3>
      <div className="post-info">
        <span className="post-time">30/7/2024</span>
        <span className="post-dot"></span>
      </div>
      <Link to="/postlist">
        <button className="p-2 text-white rounded-md bg-primary">
          Xem chi tiết
        </button>
      </Link>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
