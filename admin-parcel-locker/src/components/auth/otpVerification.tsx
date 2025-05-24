import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgAuth from "../../assets/bg_auth.png";

const OtpVerification = () => {
  const navigate = useNavigate();
  const ref1 = useRef<HTMLInputElement | null>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);
  const ref3 = useRef<HTMLInputElement | null>(null);
  const ref4 = useRef<HTMLInputElement | null>(null);

  const [codeValues, setCodeValues] = useState<string[]>(["", "", "", ""]);
  const [newCode, setNewCode] = useState("");
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit((limit) => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);
  console.log(newCode);
  useEffect(() => {
    let newCode = "";
    codeValues.forEach((code) => {
      newCode += code;
    });
    setNewCode(newCode);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };
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
            Admin of Parcel Locker makes deliveries easy.
          </p>
        </div>
      </div>

      <div className="flex flex-col pl-9 pt-16 h-screen w-1/2 bg-gray-100">
        <div className="flex flex-col mt-24 mb-16">
          <h1 className="text-3xl font-bold mb-3">OTP Verification </h1>
          <h1 className="text-lg" style={{ color: "#8391A1" }}>
            Enter the verification code we just sent on your email address.
          </h1>
        </div>
        <div className="w-1/2">
          <div className="flex flex-row gap-2">
            <input
              ref={ref1}
              type="number"
              placeholder="0"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-1/4"
              onChange={(e) => handleChangeCode(e.target.value, 0)}
            />
            <input
              ref={ref2}
              type="number"
              placeholder="0"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-1/4"
              onChange={(e) => handleChangeCode(e.target.value, 1)}
            />
            <input
              ref={ref3}
              type="number"
              placeholder="0"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-1/4"
              onChange={(e) => handleChangeCode(e.target.value, 2)}
            />
            <input
              ref={ref4}
              type="number"
              placeholder="0"
              className="border-2 border-gray-400 p-2 m-2 rounded-lg w-1/4"
              onChange={(e) => handleChangeCode(e.target.value, 3)}
            />
          </div>

          <button
            style={{ backgroundColor: "#1E232C" }}
            className="text-white p-2 m-2 rounded-lg w-full mt-6 mb-16"
            onClick={() => navigate("/resetPassword")}
          >
            <span className="font-semibold size-5">Verify</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
