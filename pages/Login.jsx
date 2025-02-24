import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Login({ setIsLoggedIn }) {
  return (
    <div className="flex items-center justify-center ml-45 mt-15 mb-30">
      <div className="flex flex-col justify-center items-center">
        <h3 className=" text-center w-[400px] text-sm text-gray-900">
          Log in to access your personalized dashboard and manage your medical
          consultations or bioinformatics services.
        </h3>
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
        <p className="mt-10">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-[#00a3cc]">
            Signup
          </Link>
        </p>
      </div>
      <DotLottieReact
        src="https://lottie.host/ffdaedd8-6037-4d5b-a52b-17acc7bbe907/LlM7uP9pHt.lottie"
        loop
        background="transparent"
        speed="1"
        autoplay
        style={{ width: "55rem", height: "35rem" }}
      />
    </div>
  );
}

export default Login;
