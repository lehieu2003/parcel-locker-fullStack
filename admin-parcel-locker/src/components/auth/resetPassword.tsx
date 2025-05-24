import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import bgAuth from "../../assets/bg_auth.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
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

      <div className="flex flex-col items-center h-screen w-1/2 bg-gray-100">
        <div className="flex flex-col items-center mt-24 mb-16">
          <h1 className="text-3xl font-bold">Create new password </h1>
          <h1 className="text-lg" style={{ color: "#8391A1" }}>
            Your new password must be unique from those previously used.
          </h1>
        </div>
        <div className="w-1/2">
          <form className="flex flex-col items-center gap-2">
            <div className="relative w-full">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-2 border-gray-400 p-2 rounded-lg "
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {newPassword.length > 0 && (
                <div
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-5 top-4"
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              )}
            </div>

            <div className="relative w-full mt-2">
              <input
                type={showNewConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border-2 border-gray-400 p-2 rounded-lg "
                onChange={(e) => setNewConfirmPassword(e.target.value)}
              />
              {newConfirmPassword.length > 0 && (
                <div
                  onClick={() =>
                    setShowNewConfirmPassword(!showNewConfirmPassword)
                  }
                  className="absolute right-5 top-4"
                >
                  {showNewConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              )}
            </div>

            <button
              style={{ backgroundColor: "#1E232C" }}
              className="text-white p-2 m-2 rounded-lg w-full mt-6 mb-16"
              onClick={() => navigate("/login")}
            >
              <span className="font-semibold size-5">Reset Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
