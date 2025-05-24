import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../ReusableComponents/ButtonComponent";
import { Data } from "../../utils/constants";
const BookingRequestModal = ({
  visible,
  onClose,
  openMap,
  newRoute
}: {
  newRoute: Data | null;
  visible: boolean;
  onClose: () => void;
  openMap: () => void;
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Booking Request</Text>

          <Text style={styles.pickUpText}>Pick-up Packages: {newRoute?.locations[0].pickup_orders.length}</Text>
          <Text style={styles.dropOffText}>Drop-off Packages: {newRoute?.locations[1].dropoff_orders.length}</Text>

          {/* <View style={styles.infoContainer}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>Total Earnings</Text>
              <Text style={styles.infoValue}>$100.9</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoBlock}>
              <Text style={styles.infoTitle}>Total Distance</Text>
              <Text style={styles.infoValue}>18 km</Text>
            </View>
          </View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <ButtonComponent text="Start Route" width={130} backgroundColor="orange" onPress={openMap} />
            <ButtonComponent text="Cancel" width={130} backgroundColor="gray" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  pickUpText: {
    fontSize: 18,
    color: "orange",
    marginBottom: 10
  },
  dropOffText: {
    fontSize: 18,
    color: "teal",
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30
  },
  infoBlock: {
    alignItems: "center",
    flex: 1
  },
  infoTitle: {
    fontSize: 16,
    color: "gray"
  },
  infoValue: {
    fontSize: 24,
    fontWeight: "bold"
  },
  divider: {
    width: 1,
    backgroundColor: "gray",
    height: "100%"
  }
});

export default BookingRequestModal;
