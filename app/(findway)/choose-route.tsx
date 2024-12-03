import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, RotateCw } from "lucide-react-native";
import PathCard from "@/app/(component)/pathCard";
import { Colors } from "@/services/COLORS";
import { useSearchParams } from "expo-router/build/hooks";

export default function ChooseRoute() {
  const router = useRouter();
  const { steps, scenery, routeType, destination } = useSearchParams();
  const [key, setKey] = useState(0);

  const reloadPathCard = () => {
    setKey(prevKey => prevKey + 1);
  };

  function Start(mapRef : any) {
    router.push({
      pathname: "/map-route",
      params: { map : mapRef },
    });
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.back()}
            >
              <ArrowLeft size={30} color={Colors.orange_fonce} />
            </TouchableOpacity>
            <Text style={styles.title}>Choose Your Path</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.cardContainer}>
            <PathCard
                key={key}
                steps={Number(steps)}
                scenery={scenery as string}
                routeType={routeType as string}
                destination={destination as string}
                onPress={Start}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
                style={styles.reloadButton}
                onPress={reloadPathCard}
            >
              <RotateCw size={24} color="#fff" />
              <Text style={styles.reloadButtonText}>New Route</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save for later</Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.orange_fonce,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
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
  reloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bleu_fonce,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  reloadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: Colors.bleu_clair,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  placeholder: {
    width: 50,
  },
});

