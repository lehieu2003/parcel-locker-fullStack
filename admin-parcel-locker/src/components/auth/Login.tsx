import { useState, useEffect, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bgAuth from "../../assets/bg_auth.png";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import UserService from "../../services/UserService";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

interface NoticeProp {
  message: string;
  color: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<NoticeProp | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { user, setUser } = userContext;

  useEffect(() => {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      const [response, loginError] = await UserService.login({
        username,
        password,
      });

      if (loginError) {
        setNotice({ message: loginError.message, color: "text-red-500" });
        return;
      }

      if (
        signIn({
          auth: {
            token: response.access_token,
            type: "Bearer",
          },
          userState: {
            username,
          },
        })
      ) {
        try {
          const [userResponse, userError] = await UserService.getUserDetails(response.access_token);
          if (userError) {
            console.error("Failed to fetch user details:", userError);
            setNotice({
              message: "Failed to fetch user details",
              color: "text-red-500",
            });
            return;
          }
          setUser(userResponse);
          console.log("User details:", user);
          window.location.href = "/userlist";
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          setNotice({
            message: "Failed to fetch user details",
            color: "text-red-500",
          });
        }
      } else {
        setNotice({ message: "Login failed", color: "text-red-500" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setNotice({ message: "An unexpected error occurred", color: "text-red-500" });
    }
  };

  return (
    <div className="flex flex-row w-full">
      <div style={{ backgroundColor: "#D9D9D9" }} className="flex flex-col w-1/2">
        <img
          src={bgAuth}
          alt="Auth background"
          className="h-1/2 flex m-auto mb-0 mt-10"
        />
        <div>
          <p className="text-4xl font-bold text-center">Life is busy,</p>
          <p className="text-4xl font-bold text-center mt-8">
            Admin of Parcel Locker makes deliveries easy.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center h-screen w-1/2 bg-gray-100">
        <div className="flex flex-col items-center mt-24 mb-16">
          <p className="text-3xl font-bold">Welcome back!</p>
          <p className="text-3xl font-bold">Glad to see you again!</p>
          {notice && <p className={`${notice.color}`}>{notice.message}</p>}
        </div>
        <div className="w-1/2">
          <form className="flex flex-col items-center gap-2" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border-2 border-gray-400 p-2 rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-4 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row gap-1">
                <input type="checkbox" style={{ backgroundColor: "#8391A1" }} />
                <label
                  style={{
                    color: "#8391A1",
                    fontWeight: "medium",
                    fontSize: 16,
                  }}
                >
                  Remember me
                </label>
              </div>
              <a
                style={{ color: "#35C2C1", fontWeight: "bold", fontSize: 16 }}
                href="forgot"
              >
                Forgot password?
              </a>
            </div>
            <button
              style={{ backgroundColor: "#1E232C" }}
              className="text-white p-2 m-2 rounded-lg w-full mt-6 mb-16"
              type="submit"
            >
              <span className="font-semibold size-5">Login</span>
            </button>
          </form>
        </div>
        <div>
          <p>
            Don't have an account?{" "}
            <a
              href="register"
              style={{ color: "#35C2C1", fontWeight: "bold", fontSize: 16 }}
            >
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
