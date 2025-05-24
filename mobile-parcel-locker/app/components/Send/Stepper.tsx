import Colors from "@/app/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const totalSteps = 5;

  return (
    <View style={styles.stepperWrapper}>
      <View style={styles.stepperContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[styles.connector, currentStep > index ? styles.activeConnector : styles.inactiveConnector]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepperWrapper: {
    backgroundColor: "transparent",
    borderRadius: 10
  },
  stepperContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  connector: {
    flex: 1,
    height: 4,
    marginHorizontal: 5
  },
  activeConnector: {
    backgroundColor: "#FF8A00"
  },
  inactiveConnector: {
    backgroundColor: Colors.grey
  }
});

export default Stepper;
