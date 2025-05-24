import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { defaultStyles } from "@/app/constants/Styles";
import { useRef } from "react";

const OtpVerification = ({ navigation, route }: any) => {
  const { email } = route.params;

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const [codeValues, setCodeValues] = useState<string[]>(["", "", "", ""]); // store number every time user types
  const [newCode, setNewCode] = useState(""); // store codeValues into the new code
  const [limit, setLimit] = useState(20); // limit the number of inputs

  useEffect(() => {
    ref1.current.focus();
  }, []);

  // useEffect(() => {
  //   if (limit > 0) {
  //     const interval = setInterval(() => {
  //       setLimit((limit) => limit - 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [limit]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLimit((prevLimit) => {
        if (prevLimit > 0) {
          return prevLimit - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const handleResendVerification = async () => {
    // Resend the verification code
  };

  const handleVerifyCode = async () => {
    // Verify the code
  };

  return (
    <View className="flex-1 bg-white p-6 pt-20">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back-outline"
          size={28}
          className="border w-7 h-7 rounded-lg border-[#ABABAB] self-start"
        />
      </TouchableOpacity>

      <View className="flex flex-col gap-5 my-6 p-2">
        <Text className="text-2xl font-bold">OTP Verification </Text>
        <Text className="text-sm text-[#8391A1]">
          Enter the verification code we just sent on your email address{" "}
          {email.replace(/.{1,5}/, (m: any) => "*".repeat(m.length))}.
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          marginVertical: 20
        }}
      >
        <TextInput
          keyboardType="number-pad"
          ref={ref1}
          autoCapitalize="none"
          className="h-14 w-14 border border-[#ABABAB] rounded-lg p-2.5 bg-[#F7F8F9] text-center text-xl font-bold"
          maxLength={1}
          placeholder="-"
          value={codeValues[0]}
          onChangeText={(val) => {
            val.length > 0 && ref2.current.focus();
            handleChangeCode(val, 0);
          }}
        />
        <TextInput
          keyboardType="number-pad"
          ref={ref2}
          autoCapitalize="none"
          className="h-14 w-14 border border-[#ABABAB] rounded-lg p-2.5 bg-[#F7F8F9] text-center text-xl font-bold"
          maxLength={1}
          placeholder="-"
          value={codeValues[1]}
          onChangeText={(val) => {
            val.length > 0 && ref3.current.focus();
            handleChangeCode(val, 1);
          }}
        />
        <TextInput
          keyboardType="number-pad"
          ref={ref3}
          autoCapitalize="none"
          className="h-14 w-14 border border-[#ABABAB] rounded-lg p-2.5 bg-[#F7F8F9] text-center text-xl font-bold"
          maxLength={1}
          placeholder="-"
          value={codeValues[2]}
          onChangeText={(val) => {
            handleChangeCode(val, 2);
            val.length > 0 && ref4.current.focus();
          }}
        />
        <TextInput
          keyboardType="number-pad"
          ref={ref4}
          autoCapitalize="none"
          className="h-14 w-14 border border-[#ABABAB] rounded-lg p-2.5 bg-[#F7F8F9] text-center text-xl font-bold"
          maxLength={1}
          placeholder="-"
          value={codeValues[3]}
          onChangeText={(val) => {
            handleChangeCode(val, 3);
          }}
        />
      </View>

      <TouchableOpacity
        className="bg-[#1e232c] h-12 rounded-xl justify-center items-center mt-7"
        disabled={newCode.length !== 4}
        onPress={() => navigation.navigate("components/Auth/ResetPassword")}
      >
        <Text style={defaultStyles.btnText}>Verify</Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20
        }}
      >
        <Text className="text-sm text-[#8391A1]">Resend code in </Text>
        <Text className="text-sm text-[#8391A1]">
          {limit > 0 ? limit : <Text onPress={handleResendVerification}>""</Text>}
        </Text>
      </View>
    </View>
  );
};

export default OtpVerification;
