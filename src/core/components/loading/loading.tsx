import React from "react";
import "./loading.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LottieMapper from "../../../assets/lottie/lottie-mapper.ts";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <DotLottieReact
        src={LottieMapper.GetFile("loading")}
        loop
        autoplay
        style={{ width: 156, height: 156 }}
      />
      <h2 style={{ fontFamily: "tahoma" }}>Norsou Software Solutions</h2>
    </div>
  );
};

export default LoadingScreen;
