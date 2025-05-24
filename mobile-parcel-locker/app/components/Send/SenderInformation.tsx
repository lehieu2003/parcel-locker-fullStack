import { defaultStyles } from "@/app/constants/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputHookFormComponent from "../ReusableComponents/InputHookFormComponent";
const SenderInformation = ({
  control,
  errors,
  parcelContext,
  onPressViewSender,
  validateEmail
}: {
  control: any;
  errors: any;
  parcelContext: any;
  onPressViewSender: any;
  validateEmail: any;
}) => {
  return (
    <View>
      <Text className="text-[25px] text-[#213E60] text-center my-[10px] font-bold">Sender Information</Text>

      <View>
        <View className="gap-[10px]">
          <View
            style={{
              position: "relative"
            }}
          >
            <InputHookFormComponent
              control={control}
              name="senderFullName"
              placeholder="Full Name"
              rules={{ required: true }}
              errorMessage={errors.senderFullName ? "Sender Full Name is required." : ""}
              placeholderTextColor="#c9c9c9"
              style={defaultStyles.inputFieldSenderInfo}
            />
            <Text className="absolute right-3 top-4 text-[#FF6262]">*</Text>
          </View>
          {errors.senderFullName && <Text className="text-[#FF6262]">Sender Full Name is required.</Text>}

          <View
            style={{
              position: "relative"
            }}
          >
            <InputHookFormComponent
              control={control}
              name="senderPhone"
              placeholder="Phone number"
              rules={{
                required: true,

                minLength: 10,
                maxLength: 10
              }}
              errorMessage={""}
              keyboardType="numeric"
              placeholderTextColor="#c9c9c9"
              style={[defaultStyles.inputFieldSenderInfo, { flexGrow: 1 }]}
            />
            <Text className="absolute right-3 top-4 text-[#FF6262] ">*</Text>
          </View>
          {errors.senderPhone && <Text className="text-[#FF6262]">Sender Phone must be 10 digits.</Text>}

          <View
            style={{
              position: "relative"
            }}
          >
            <InputHookFormComponent
              control={control}
              name="senderEmail"
              placeholder="Email address"
              rules={{ required: true, validate: validateEmail }}
              errorMessage={errors.senderEmail ? "Invalid Email Address." : ""}
              placeholderTextColor="#c9c9c9"
              style={defaultStyles.inputFieldSenderInfo}
            />
            <Text className="absolute right-3 top-4 text-[#FF6262]">*</Text>
          </View>
          {errors.senderEmail && <Text className="text-[#FF6262]">Invalid Email Address.</Text>}

          <View style={[defaultStyles.inputFieldSenderInfo, { height: 60 }]} className="relative">
            {parcelContext.senderInfo.senderAddress ? (
              <Text>{parcelContext.senderInfo.senderAddress}</Text>
            ) : (
              <Text className="text-[#c9c9c9]">Choose sender's address below</Text>
            )}
            <Text className="absolute right-3 top-4 text-[#FF6262]">*</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.mapBtn} onPress={onPressViewSender}>
          <Text className="text-[16px] font-medium">View Locker Location </Text>
          <MaterialCommunityIcons name="map" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SenderInformation;

const styles = StyleSheet.create({
  mapBtn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    borderWidth: 4,
    shadowRadius: 20,
    shadowColor: "#000",
    elevation: 4,
    alignSelf: "center",
    width: "80%",
    borderColor: "#ff9c3f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
  },
  placeholder: {
    fontSize: 12
  }
});
