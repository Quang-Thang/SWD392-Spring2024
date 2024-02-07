import React from "react";
import styled from "styled-components";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      display: inline-block;
      padding: 8px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      background-color: #f3edff;
      margin-bottom: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #6b6b6b;
      margin-top: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
`;

const PostItem = () => {
  return (
    <PostItemStyles>
      <div className="post-image">
        <img
          srcSet="https://bietthuphumyhung.vn/images/banner/thumb/phu-my-hung-1536411270-600x406.jpg"
          alt="post-item"
        />
      </div>
      <div className="post-category">Đang diễn ra</div>
      <h3 className="post-title">Nhà đất quận 7 khu Phú Mỹ Hưng</h3>
      <div className="post-info">
        <span className="post-time">14/2/2024</span>
        <span className="post-dot"></span>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
