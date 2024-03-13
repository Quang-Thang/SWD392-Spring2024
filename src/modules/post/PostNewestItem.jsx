import React from "react";
import styled from "styled-components";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }

  .post-image {
    display: block;
    flex-shrink: 0;
    width: 180px;
    height: 130px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  .post-category {
    display: inline-block;
    padding: 8px;
    border-radius: 8px;
    color: #6b6b6b;
    font-size: 12px;
    font-weight: 600;
    background-color: white;
    margin-bottom: 8px;
  }
  .post-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    margin-left: auto;
    color: #6b6b6b;
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
    font-size: 16px;
    margin-bottom: 8px;
  }
`;
const PostNewestItem = () => {
  return (
    <PostNewestItemStyles>
      <div className="post-image">
        <img
          srcSet="https://muabannhadatquan7.com/upload/media/hinh-ban-dat-an-lac-1631.jpg"
          alt="post-newest-item"
        />
      </div>
      <div className="post-content">
        <span className="post-category">Đang diễn ra</span>
        <h3 className="post-title">Đất huyện Bình Chánh</h3>
        <div className="post-info">
          <span className="post-time">7/2/2024</span>
          <span className="post-dot"></span>
        </div>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
