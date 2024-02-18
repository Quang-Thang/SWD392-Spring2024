import Button from "@/components/login/Button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    &-content {
      max-width: 550px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }

  .banner-image {
    padding-left: 25px;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Real Estate Auction System</h1>
            <p className="banner-desc">
              Công ty Đấu Giá Bất Động Sản XYZ là một trong những công ty hàng
              đầu trong lĩnh vực đấu giá và quản lý bất động sản. Với hơn 20 năm
              kinh nghiệm, chúng tôi đã xây dựng một danh tiếng mạnh mẽ trong
              việc cung cấp dịch vụ đấu giá chuyên nghiệp và hiệu quả.{" "}
              <p>
                Chúng tôi cam kết mang lại giá trị cao nhất cho khách hàng thông
                qua dịch vụ chuyên nghiệp, minh bạch và chất lượng. Hãy liên hệ
                với chúng tôi để biết thêm thông tin và khám phá cách chúng tôi
                có thể hỗ trợ bạn trong mọi nhu cầu liên quan đến bất động sản.
              </p>
            </p>
            <Button to="/login">Bắt đầu</Button>
          </div>
          <div className="banner-image">
            <img
              srcSet="https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FhjdBzZGIxm-uBmLkuG7abg%252Fd7hftxdivxxvm.cloudfront.net.jpeg&width=910"
              alt="real-estate-auction-system-banner"
            />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
