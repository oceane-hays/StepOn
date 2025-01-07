import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { Colors } from "@/services/COLORS";
import Logo from "@/app/(component)/logo";
import Icon from "react-native-vector-icons/Ionicons";
import { useSearchParams } from "expo-router/build/hooks";

export default function SetUpYourGoal() {
  const [goal, setGoal] = useState(0);
  const router = useRouter();

  const params: any = useSearchParams();
  const { currGoal } = params;

  const increment = () => {
    setGoal((prevGoal) => Math.min(prevGoal + 500, 20000));
  };

  const decrement = () => {
    setGoal((prevGoal) => Math.max(prevGoal - 500, 0));
  };

  return (
      <View style={styles.container}>

        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Icon name="remove" size={24} color={Colors.orange_fonce} />
          </TouchableOpacity>
          <View style={styles.goalContainer}>
            <Text style={styles.goalText}>{goal}</Text>
            <Text style={styles.unitText}>steps</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={increment}>
            <Icon name="add" size={24} color={Colors.orange_fonce} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}

        >
          <Text style={styles.submitButtonText}>Change Goal</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },


  counterContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 7,
    shadowColor: Colors.gris_fonce,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  buttonText: {
    fontSize: 24,
    color: "white",
  },
  goalContainer: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  goalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  unitText: {
    fontSize: 16,
    color: "#666",
  },
  submitButton: {
    width: "80%",
    backgroundColor: Colors.orange_fonce,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 50, // Match the width of the button
  },
});
