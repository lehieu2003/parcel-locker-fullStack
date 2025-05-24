import { defaultStyles } from "@/app/constants/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputHookFormComponent from "../ReusableComponents/InputHookFormComponent";

const RecipientInformation = ({
  control,
  errors,
  parcelContext,
  onPressViewHome,
  onPressViewRecipient,
  validateEmail
}: {
  control: any;
  errors: any;
  parcelContext: any;
  onPressViewHome: any;
  onPressViewRecipient: any;
  validateEmail: any;
}) => {
  return (
    <View>
      <Text className="text-[25px] text-[#213E60] text-center my-[10px] font-bold">Recipient Information</Text>
      <View>
        <View className="gap-[10px]">
          <View
            style={{
              position: "relative"
            }}
          >
            <InputHookFormComponent
              control={control}
              name="recipientFullName"
              placeholder="Full name"
              rules={{ required: true }}
              errorMessage={errors.recipientFullName ? "Recipient Full Name is required." : ""}
              placeholderTextColor="#c9c9c9"
              style={defaultStyles.inputFieldSenderInfo}
            />
            <Text className="absolute right-3 top-4 text-[#FF6262]">*</Text>
          </View>
          {errors.recipientFullName && <Text className="text-[#FF6262]">Recipient Full Name is required.</Text>}

          <View
            style={{
              position: "relative"
            }}
          >
            <InputHookFormComponent
              control={control}
              name="recipientPhone"
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
            <Text className="absolute right-3 top-4 text-[#FF6262]">*</Text>
          </View>
          {errors.recipientPhone && <Text className="text-[#FF6262]">Recipient Phone must be 10 digits.</Text>}

          <View
            style={{
              position: "relative"
            }}
          >
            <InputHookFormComponent
              control={control}
              name="recipientEmail"
              placeholder="Email address"
              rules={{ required: true, validate: validateEmail }}
              errorMessage={errors.recipientEmail ? "Invalid Email Address." : ""}
              placeholderTextColor="#c9c9c9"
              style={defaultStyles.inputFieldSenderInfo}
            />
            <Text className="absolute right-3 top-4 text-[#FF6262]">*</Text>
          </View>
          {errors.recipientEmail && <Text style={{ color: "red" }}>Invalid Email Address.</Text>}
          <View style={[defaultStyles.inputFieldSenderInfo, { height: 60 }]} className="relative">
            {parcelContext.recipientInfo.recipientAddress ? (
              <Text>{parcelContext.recipientInfo.recipientAddress}</Text>
            ) : (
              <Text style={{ color: "#c9c9c9" }}>Choose receiver's address below</Text>
            )}
            <Text className="absolute right-3 top-4 text-[#FF6262]">*</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={parcelContext.parcel.sendingType?.home ? onPressViewHome : onPressViewRecipient}
        >
          <Text style={styles.btnContent}>View {parcelContext.parcel.sendingType?.textTo} Location</Text>
          <MaterialCommunityIcons name="map" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipientInformation;

const styles = StyleSheet.create({
  btnContent: {
    color: "black",
    fontFamily: "mon-sb",
    fontSize: 16
  },
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
