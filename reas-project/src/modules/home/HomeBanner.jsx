import React from "react";

const HomeBanner = () => {
  return (
    <div className="p-5 mx-40 mt-10">
      <div className="flex">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-primary basis-[60%] rounded-tl-lg rounded-bl-lg">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
              Công ty TNHH CPP
            </h1>
            <p className="mt-4 text-xl text-white">
              Công ty TNHH CPP là một trong những công ty hàng đầu trong lĩnh
              vực đấu giá và quản lý bất động sản. Với hơn 20 năm kinh nghiệm,
              chúng tôi đã xây dựng một danh tiếng mạnh mẽ trong việc cung cấp
              dịch vụ đấu giá chuyên nghiệp và hiệu quả.
              <p>
                Chúng tôi cam kết mang lại giá trị cao nhất cho khách hàng thông
                qua dịch vụ chuyên nghiệp, minh bạch và chất lượng. Hãy liên hệ
                với chúng tôi để biết thêm thông tin và khám phá cách chúng tôi
                có thể hỗ trợ bạn trong mọi nhu cầu liên quan đến bất động sản.
              </p>
            </p>
            <button className="inline-flex items-center px-4 py-2 mt-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
              Bắt đầu
            </button>
          </div>
        </div>
        <div className="basis-[40%]">
          <img
            srcSet="https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FhjdBzZGIxm-uBmLkuG7abg%252Fd7hftxdivxxvm.cloudfront.net.jpeg&width=910"
            alt="real-estate-auction-system-banner"
            className="w-full h-full bg-cover rounded-tr-lg rounded-br-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
