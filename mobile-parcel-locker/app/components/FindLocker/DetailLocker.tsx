import React from "react";
import { View, Text, StyleSheet } from "react-native";

// interface LockerProperties {
//   locker_name: string;
// }

interface LockerType {
  locker_id: number;
  address: string;
  latitude: number;
  longitude: number;
  totalCells: number;
  availableCells: number;
  emptySmallCells: number;
  emptyMediumCells: number;
  emptyLargeCells: number;
  distance?: number;
}

interface DetailLockerProps {
  selectedLocker: LockerType;
}

const DetailLocker: React.FC<DetailLockerProps> = ({ selectedLocker }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.lockerName}>{selectedLocker?.address}</Text>
      <Text style={styles.distanceText}>
        {selectedLocker?.distance ? `${selectedLocker.distance.toFixed(2)} km away from you` : "Distance not available"}
      </Text>

      <View style={styles.detailContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total cells:</Text>
          <Text style={styles.value}>{selectedLocker?.totalCells}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Available cells:</Text>
          <Text style={styles.value}>{selectedLocker?.availableCells}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Empty small cells:</Text>
          <Text style={styles.value}>{selectedLocker?.emptySmallCells}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Empty medium cells:</Text>
          <Text style={styles.value}>{selectedLocker?.emptyMediumCells}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Empty large cells:</Text>
          <Text style={styles.value}>{selectedLocker?.emptyLargeCells}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff"
  },
  lockerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#213E60",
    marginBottom: 8
  },
  distanceText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16
  },
  detailContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 8
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0"
  },
  label: {
    fontSize: 16,
    color: "#666"
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#213E60"
  }
});

export default DetailLocker;
