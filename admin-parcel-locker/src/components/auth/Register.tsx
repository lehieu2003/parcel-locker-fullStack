import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import bgAuth from "../../assets/bg_auth.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  console.log(username, email, password, confirmPassword);
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
          <h1 className="text-3xl font-bold">Welcome back! </h1>
          <h1 className="text-3xl font-bold">Glad to see you again!</h1>
        </div>
        <div className="w-1/2">
          <form className="flex flex-col items-center gap-2">
            <input
              type="text"
              placeholder="Username"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-2 border-gray-400 p-2 rounded-lg "
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-4"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              )}
            </div>

            <div className="relative w-full mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border-2 border-gray-400 p-2 rounded-lg "
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword.length > 0 && (
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-4"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              )}
            </div>

            <button
              style={{ backgroundColor: "#1E232C" }}
              className="text-white p-2 m-2 rounded-lg w-full mt-6 mb-16"
            >
              <span className="font-semibold size-5">Register</span>
            </button>
          </form>
        </div>
        <div>
          <p>
            Already have an account?{" "}
            <a
              href="login"
              style={{ color: "#35C2C1", fontWeight: "bold", fontSize: 16 }}
            >
              Login Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
