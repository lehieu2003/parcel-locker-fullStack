import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgAuth from "../../assets/bg_auth.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-row w-full">
      <div
        style={{ backgroundColor: "#D9D9D9" }}
        className="flex flex-col w-1/2"
      >
        <img
          src={bgAuth}
          alt="random"
          className="h-1/2 flex m-auto mb-0 mt-10"
        />
        <div>
          <h1 className="text-4xl font-bold text-center">Life is busy,</h1>
          <p className="text-4xl font-bold text-center mt-8">
            Admin of Parcel Locker makes deliveries easy.{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col pl-9 pt-16 h-screen w-1/2 bg-gray-100">
        <div className="flex flex-col mt-24 mb-16">
          <h1 className="text-3xl font-bold mb-3">Forgot Password? </h1>
          <h1 className="text-lg" style={{ color: "#8391A1" }}>
            Don't worry! It occurs. Please enter the email address linked with
            your account.
          </h1>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-full"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              style={{ backgroundColor: "#1E232C" }}
              className="text-white p-2 m-2 rounded-lg w-full mt-6 mb-16"
              onClick={() => {
                console.log(email); // Use the email state variable
                navigate("/otpVerification");
              }}
            >
              <span className="font-semibold size-5">Send code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
