import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import BottomSheetMap from "@/app/(component)/bottomSheetMap";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import { GOOGLE_MAPS_API_KEY } from "@/services/GOOGLE_MAPS_API_KEY";
import { LATITUDE_DELTA } from "@/services/LATITUDE_DELTA";
import { LONGITUDE_DELTA } from "@/services/LONGITUDE_DELTA";
import Weather from "@/app/(component)/weather";

const default_location: any = {
  latitude: 45.48833488659076,
  longitude: -73.63675359307672,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function GoogleMapScreen() {
  const mapRef: any = useRef();
  const [destination, setDestination] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      const { coords }: any = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      console.log("Location:");
      console.log(coords);

      if (coords) {
        console.log(coords["latitude"], coords["longitude"]);
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    };
    getPermissions();
  }, []);

  console.log(destination);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={default_location}
      >
        {default_location !== undefined && (
          <Marker coordinate={default_location} />
        )}
        {destination !== undefined && <Marker coordinate={destination} />}
        {default_location && destination && (
          <MapViewDirections
            origin={default_location}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor="orange"
            strokeWidth={4}
            onError={(error) => console.log("Directions error:", error)}
          />
        )}
      </MapView>
      <BottomSheetMap
        mapRef={mapRef}
        setDestination={setDestination}
        currLocation={location}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
