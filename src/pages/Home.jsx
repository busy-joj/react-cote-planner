import React from "react";
import mainBanner from "@/assets/landing.png";
const HomePage = () => {
  return (
    <div className="w-[1200px] my-0 mx-auto pt-[60px] flex flex-col h-screen">
      <div className="flex flex-col justify-center h-4/5 gap-[25px] relative z-10">
        <h1 className="text-4xl font-bold leading-normal ">
          코딩테스트 문제 매일 풀고 있다고
          <br /> 안심하시면 안됩니다.
        </h1>
        <p className="text-lg font-bold">
          문제를 많이 푸는 것보다 중요한 것은{" "}
          <span className="text-orange-600">인식하고 푸는 것입니다.</span>
          <br />
          해결한 문제를 복습하여야 기억하고 인식할 수 있습니다. <br />
          저희가 자동화된 학습과 복습 일정을 제공하여
          <br /> 코테 지옥 탈출을 돕겠습니다.
        </p>
      </div>

      <img
        src={mainBanner}
        className="inline-block fixed bottom-[30%] w-[50%] right-[-3%]"
      />
    </div>
  );
};

export default HomePage;
