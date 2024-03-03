import React from "react";
import styled from "styled-components";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
  .post-overlay {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(
      179.77deg,
      #6b6b6b 36.45%,
      rgba(163, 163, 163, 0.622265) 63.98%,
      rgba(255, 255, 255, 0) 99.8%
    );
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
  .post-content {
    position: absolute;
    inset: 0;
    z-index: 10;
    padding: 20px;
    color: white;
  }
  .post-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .post-category {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 8px;
    color: #6b6b6b;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    background-color: #f3f3f3;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }
  .post-info {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    font-weight: 600;
    color: white;
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
    color: white;
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = () => {
  return (
    <PostFeatureItemStyles>
      <img
        srcSet="https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2023/11/12/bd27_1699807578.jpg"
        alt="unsplash"
        className="post-image"
      />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <span className="post-category">Đã kết thúc</span>
          <div className="post-info">
            <span className="post-time">25/5/2023</span>
            <span className="post-dot"></span>
          </div>
        </div>
        <h3 className="post-title">
          Nhà đất quận 1 trung tâm Thành Phố Hồ Chí Minh
        </h3>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
