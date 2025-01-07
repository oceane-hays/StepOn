import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Logo from "@/app/(component)/logo";
import Filter from "@/app/(component)/filter";
import SearchBar from "@/app/(component)/search";
import { Colors } from "@/services/COLORS";


export default function PlanRoute() {
  const [steps, setSteps] = useState(4000);
  const [scenery, setScenery] = useState<string | null>(null);
  const [routeType, setRouteType] = useState<string | null>(null);
  const [routeTransport, setRouteTransport] = useState<string | null>(null);
  const [destination, setLocalDestination] = useState<string | null>(null);

  const router = useRouter();

  function submitRoute() {
    if (scenery === null && routeType === null && routeTransport !== null) {
      Alert.alert(routeTransport);
    } else {
      router.push({
        pathname: "/choose-route",
        params: {
          steps: steps.toString(),
          scenery,
          routeType,
          destination,
          routeTransport
        },
      });
    }
  }

  function submitRouteSkip() {
    router.push({
      pathname: "/choose-route",
      params: {
        steps: steps.toString(),
        scenery,
        routeType,
        destination: null
      },
    });
  }

  const incrementSteps = () => setSteps((prev) => Math.min(prev + 1000, 10000));
  const decrementSteps = () => setSteps((prev) => Math.max(prev - 1000, 1000));

  const handleDestinationChange = (newDestination: string) => {
    setLocalDestination(newDestination);
  };

  return (
      <SafeAreaView style={styles.container}>
        <Logo />
        <View style={styles.card}>
          <Filter
              incrementSteps={incrementSteps}
              decrementSteps={decrementSteps}
              steps={steps}
              scenery={scenery}
              setScenery={setScenery}
              routeType={routeType}
              setRouteType={setRouteType}
              transport={routeTransport}
              setRouteTransport={setRouteTransport}
          />
          <SearchBar setDestination={handleDestinationChange} />
          <View style={styles.row}>
            <TouchableOpacity
                style={[styles.actionButton, styles.outlineButton]}
                onPress={submitRouteSkip}
            >
              <Text style={styles.outlineButtonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.actionButton}
                onPress={submitRoute}
            >
              <Text style={styles.actionButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.orange_fonce,
  },
  card: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: Colors.gris,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    backgroundColor: Colors.orange_fonce,
    alignItems: "center",
    marginHorizontal: 4,
  },
  actionButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  outlineButton: {
    backgroundColor: "#f0f0f0",
  },
  outlineButtonText: {
    fontSize: 16,
    color: Colors.orange_fonce,
  },
  placeholder: {
    width: 50,
  },
});

