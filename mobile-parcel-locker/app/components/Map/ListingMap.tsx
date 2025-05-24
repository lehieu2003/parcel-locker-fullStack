import Colors from "@/app/constants/Colors";
import { defaultStyles } from "@/app/constants/Styles";
import { MAP_ENDPOINT } from "@/app/utils/constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
interface MapProps {
  listings: any;
  setAddress: (address: string) => void;
  setLockerId: (lockerId: number) => void;
  lockerId: number;
  home: boolean;
}

const INITIAL_REGION = {
  latitude: 10.877922,
  longitude: 106.801518,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005
};

const ListingsMap: React.FC<MapProps> = React.memo(function ListingMap({
  listings,
  setAddress,
  setLockerId,
  lockerId,
  home
}) {
  const mapRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigation = useNavigation();
  const [marker, setMarker] = useState<any>(null);

  const requestLocation = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const permissionResponse = await Location.requestForegroundPermissionsAsync();
        if (permissionResponse.status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required to access your current location.");
          return null;
        }
      }

      const location =
        (await Location.getLastKnownPositionAsync()) ||
        (await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        }));

      return location ? location.coords : null;
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Unable to fetch your current location. Please try again.");
      return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      requestLocation();
    }, [])
  );

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `${MAP_ENDPOINT}reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            "User-Agent": "MyApp/1.0 (contact@myapp.com)"
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }
      const result = await response.json();
      const address = result.address;
      const formattedAddress = [
        address.house_number,
        address.road,
        address.suburb,
        address.city,
        address.state,
        address.postcode,
        address.country
      ]
        .filter(Boolean)
        .join(", ");
      return formattedAddress || `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
    } catch (error: any) {
      Alert.alert("Error", `Failed to get address from coordinates: ${error.message}`);
      return `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
    }
  };

  const handleMapPress = async (e: any) => {
    if (home) {
      const { coordinate } = e.nativeEvent;
      if (coordinate) {
        const address = await reverseGeocode(coordinate.latitude, coordinate.longitude);
        const newMarker = {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          title: `Pinned Location`,
          description: address
        };
        setMarker(newMarker);
        setAddress(newMarker.description);
      }
    }
  };

  const clearMarker = () => {
    setMarker(null);
    setAddress("");
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    if (home) {
      try {
        const response = await fetch(
          `${MAP_ENDPOINT}search?format=json&q=${encodeURIComponent(query)}&zoom=18&addressdetails=1&countrycodes=VN&limit=5`,
          {
            headers: {
              "User-Agent": "MyApp/1.0 (contact@myapp.com)"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to search for location");
        }

        const results = await response.json();

        const formattedResults = results.map((result: any) => {
          const address = result.address || {};
          const formattedAddress = [
            address.road,
            address.hamlet,
            address.village,
            address.suburb,
            address.city_district,
            address.city || address.town,
            address.county,
            address.state,
            address.postcode,
            address.country
          ]
            .filter(Boolean)
            .join(", ");

          return {
            ...result,
            display_name: formattedAddress || result.display_name || "Unknown Location"
          };
        });

        setSuggestions(formattedResults.slice(0, 5).filter((item: any) => typeof item.display_name === "string"));
      } catch (error: any) {
        console.error("Error in handleSearch:", error);
        Alert.alert("Error", error.message || "Failed to search for locations.");
      }
    } else {
      const results = listings.filter((item: { address: string }) =>
        item?.address?.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(results.slice(0, 5));
    }
  };

  const onMarkerSelected = (item: any) => {
    setAddress(item.address);
    setLockerId(item.locker_id);
  };

  const onLocateMe = async () => {
    const location = await requestLocation();
    if (location) {
      const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      };
      setUserLocation(location);
      mapRef.current?.animateToRegion(region, 1000);
    }
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry } = cluster;

    const onPress = () => {
      const coordinates = cluster.geometry.coordinates;
      const region = {
        latitude: coordinates[1],
        longitude: coordinates[0],

        latitudeDelta: 0.00000001,
        longitudeDelta: 0.00000001
      };
      mapRef.current?.animateToRegion(region);
    };

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1]
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <MaterialCommunityIcons name="cube-send" color={Colors.blue} size={20} />
        </View>
      </Marker>
    );
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.key === " " || nativeEvent.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const onSuggestionPress = (suggestion: any) => {
    if (home) {
      const { lat, lon, display_name } = suggestion;

      const formattedDisplayName =
        typeof display_name === "string"
          ? display_name
          : [
              display_name?.road,
              display_name?.village,
              display_name?.city,
              display_name?.state,
              display_name?.country,
              display_name?.country_code,
              display_name?.["ISO3166-2-lvl4"],
              display_name?.postcode,
              display_name?.suburb,
              display_name?.hamlet,
              display_name?.town,
              display_name?.city_district,
              display_name?.county,
              display_name?.state_district,
              display_name?.region,
              display_name?.continent
            ]
              .filter(Boolean)
              .join(", ");

      const region = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        latitudeDelta: 0.00000001,
        longitudeDelta: 0.00000001
      };

      const newMarker = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        title: `Pinned Location`,
        description: formattedDisplayName
      };

      setMarker(newMarker);
      setAddress(newMarker.description);
      setSearchQuery(formattedDisplayName);
      setSuggestions([]);
      mapRef.current?.animateToRegion(region);
    } else {
      if (suggestion) {
        const region = {
          latitude: suggestion.latitude,
          longitude: suggestion.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        };
        const lockerName = suggestion.address;
        setAddress(lockerName);
        setLockerId(suggestion.locker_id);
        mapRef.current?.animateToRegion(region);
        setSuggestions([]);
      } else {
        console.error("Suggestion is undefined");
      }
    }
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        onPress={home ? handleMapPress : undefined}
        ref={mapRef}
        animationEnabled={false}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {home && marker && (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.title}
            description={marker.description}
          >
            <View style={styles.redMarker}>
              <Text style={styles.markerText}>{marker.title}</Text>
            </View>
          </Marker>
        )}
        {home
          ? null
          : listings?.map((item: any) => (
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude
                }}
                key={`marker-${item.locker_id}`}
                onPress={() => onMarkerSelected(item)}
              >
                <View style={[styles.marker, lockerId === item.locker_id && styles.selectedMarker]}>
                  <Text style={styles.markerText}>{item.address}</Text>
                </View>
              </Marker>
            ))}
      </MapView>
      {home && (
        <TouchableOpacity style={styles.locateBtn} onPress={clearMarker}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      )}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for places"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onKeyPress={handleKeyPress}
          />
          <TouchableOpacity onPress={() => handleSearch(searchQuery)} style={styles.searchButton}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => (home ? item.place_id : item.locker_id.toString())}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSuggestionPress(item)}>
                <Text style={styles.suggestionText}>{home ? item.display_name : item.address}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <TouchableOpacity style={styles.locateBtn2} onPress={onLocateMe}>
        <Ionicons name="navigate" size={24} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    top: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 1000,
    justifyContent: "space-between"
  },
  backButton: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10
  },
  searchButton: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 10
  },
  suggestionsContainer: {
    position: "absolute",
    top: 85,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 999,
    color: "black"
  },
  suggestionText: {
    padding: 10,
    color: "black"
  },
  marker: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  redMarker: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  selectedMarker: {
    backgroundColor: Colors.orange_1
  },
  markerText: {
    color: "#fff",
    fontWeight: "bold"
  },
  locateBtn: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    elevation: 5
  },
  locateBtn2: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    elevation: 5
  }
});

export default ListingsMap;
