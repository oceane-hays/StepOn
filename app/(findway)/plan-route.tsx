import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Logo from "@/app/(component)/logo";
import Filter from "@/app/(component)/filter";
import { Colors } from "@/services/COLORS";
import { useNavigation, useRouter } from "expo-router";
import { NavigationProp } from "@react-navigation/core";

export default function PlanRoute() {
  const [steps, setSteps] = useState(1000);
  const [scenery, setScenery] = useState<string | null>(null);
  const [routeType, setRouteType] = useState<string | null>(null);

  const router = useRouter();

  function SubmitRoute(
    steps: number,
    scenery: string | null,
    routeType: string | null,
    destination: string | null
  ) {
    // You can pass parameters to the route if needed
    router.push({
      pathname: "/choose-route",
      params: { steps, scenery, routeType, destination },
    });
  }

  const incrementSteps = () => setSteps((prev) => Math.min(prev + 1000, 10000));
  const decrementSteps = () => setSteps((prev) => Math.max(prev - 1000, 1000));

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ marginBottom: 90 }}>
          <Logo />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Plan Your Route</Text>
          <View style={styles.placeholder} />
        </View>
      </View>

      <View
        style={{
          ...card,
          flex: 1,
          justifyContent: "space-around",
          backgroundColor: Colors.gris,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
      >
        <Filter
          incrementSteps={incrementSteps}
          decrementSteps={decrementSteps}
          steps={steps}
          scenery={scenery}
          setScenery={setScenery}
          routeType={routeType}
          setRouteType={setRouteType}
        />

        {/* Action Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.actionButton, styles.outlineButton]}
            onPress={() => SubmitRoute(0, null, null, null)}
          >
            <Text style={styles.outlineButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => SubmitRoute(steps, scenery, routeType, null)}
          >
            <Text style={styles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const card = {
  marginHorizontal: 20,
  marginBottom: 30,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    ...card,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.orange_fonce,
  },
  iconButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    marginRight: 12,
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
  button: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: Colors.gris_fonce,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  placeholder: {
    width: 50, // Match the width of the button
  },
});
