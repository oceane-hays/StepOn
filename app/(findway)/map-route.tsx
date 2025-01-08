import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text, Image,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { LATITUDE_DELTA } from "@/services/LATITUDE_DELTA";
import { LONGITUDE_DELTA } from "@/services/LONGITUDE_DELTA";
import { Colors } from "@/services/COLORS";
import { CircularItems } from "@/app/(component)/RouteComponent/CircularItems";
import { Footprints, MapPin, Timer } from "lucide-react-native";
import { GenerateRoundTrip } from "@/app/(component)/RouteComponent/generateRoute";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@/services/GOOGLE_MAPS_API_KEY";
import { Destination } from "@/app/(component)/RouteComponent/types";
import { AppState } from "react-native";
import { differenceInSeconds } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useGlobalSearchParams, useRouter} from "expo-router";
import * as Location from "expo-location";

const DEFAULT_LOCATION: Region = {
  latitude: 45.5010498,
  longitude: -73.6156192,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const height = 1.7; // in meters

export default function MapRoute() {
  const mapRef = useRef<MapView>(null);
  const [distance, setDistance] = useState(0);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const appState = useRef(AppState.currentState);
  const [elapsed, setElapsed] = useState<number | undefined>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const router = useRouter();
  const glob = useGlobalSearchParams();

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


  const route = GenerateRoundTrip(DEFAULT_LOCATION, Number(glob.steps) ,height);

  const recordStartTime = async () => {
    try {
      const now = new Date();
      if (elapsed) {
        await AsyncStorage.setItem("@last_time", elapsed.toString());
      }
      await AsyncStorage.setItem("@start_time", now.toISOString());
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  useEffect(() => {
    recordStartTime();

    const interval = setInterval(async () => {
      if (!isPaused) {
        const elapsedTime = await getElapsedTime();
        setElapsed(elapsedTime ?? 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    recordStartTime();
    AppState.addEventListener("change", handleAppStateChange);
    return;
  }, []);

  const handleAppStateChange = async (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (!isPaused) {
        const elapsed = await getElapsedTime();
        setElapsed(elapsed ?? 0);
      }
    }
    appState.current = nextAppState;
  };
  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem("@start_time");
      var lastTime: string | null = "0";
      if (elapsed) {
        lastTime = await AsyncStorage.getItem("@last_time");
      }
      const now = new Date();

      if (startTime)
        return (
          differenceInSeconds(now, Date.parse(startTime)) +
          Number.parseFloat(lastTime ?? "0")
        );
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  useEffect(() => {
    const newDestinations: Destination[] = route.map((point) => {
      if ("center" in point && point.center) {
        return point.center;
      } else {
        return { latitude: point.latitude, longitude: point.longitude };
      }
    });
    setDestinations(newDestinations);
  }, []);

  const handleTakeABreak = () => {
    setIsPaused((prevState) => !prevState);
  };

  function handleFinish() {
    router.push({
      pathname: "/end-route",
      params: {
        time : elapsed,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: route[0].latitude,
            longitude: route[0].longitude,
            latitudeDelta: route[0].latitudeDelta,
            longitudeDelta: route[0].longitudeDelta,
          }}
        >
          {destinations.map((point, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              title={`Point ${index}`}
            />
          ))}
          {destinations.map((destination, index) => {
            if (index === 0) return null;
            console.log(distance);
            return (
              <MapViewDirections
                key={index}
                origin={destinations[index - 1]}
                destination={destination}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeColor="orange"
                strokeWidth={4}
                onError={(error) => console.log("Directions error:", error)}
                onReady={(result) => {
                  setDistance(result.distance); // Distance in kilometers
                }}
              />
            );
          })}
        </MapView>

        <View style={styles.cardContainer}>
          <View
            style={{
              ...styles.card,
              padding: 20,
              width: "85%",
              alignSelf: "center",
            }}
          >
            <CircularItems
              icon={<Footprints color={Colors.orange_fonce} />}
              numb={0}
              pourcent={0}
              colors={Colors.orange_fonce}
            />
            <View style={{ alignItems: "center" }}>
              <Timer color='#000' />
              <Text
                style={{
                  color: '#000',
                  fontSize: 30,
                  marginBottom: 10,
                  fontWeight: "500",
                }}
              >
                {elapsed ? Math.floor(elapsed / 3600) : 0}:{""}
                {elapsed ? Math.floor(elapsed / 60) % 60 : 0}'
                {elapsed ? elapsed % 60 : 0}''
              </Text>
            </View>
            <CircularItems
              icon={<Image
                  source={require('./../../assets/images/fire-icon.png')}
                  resizeMode="contain"
                  style={{width:42,height:42}}

              />}
              numb={0}
              pourcent={0}
              colors={Colors.bleu_clair}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.bleu_clair }]}
              onPress={handleTakeABreak}
            >
              <Text style={styles.buttonText}>
                {isPaused ? "Resume" : "Take a Break"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.orange_fonce }]}
              onPress={handleFinish}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    borderRadius: 20,
    backgroundColor: "white",
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    opacity: 0.9,
  },
  card: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  divider: {
    alignSelf: "center",
    height: 1,
    backgroundColor: "#ccc",
    width: "90%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 20,
    padding: 15,
    shadowColor: Colors.gris_fonce,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
});
