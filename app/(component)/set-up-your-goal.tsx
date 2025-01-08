import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "@/services/COLORS";

interface SetUpYourGoalProps {
  currentGoal: number;
  onGoalChange: (newGoal: number) => void;
}

export default function SetUpYourGoal({ currentGoal, onGoalChange }: SetUpYourGoalProps) {
  const [goal, setGoal] = useState(currentGoal);

  useEffect(() => {
    setGoal(currentGoal);
  }, [currentGoal]);

  const increment = () => {
    setGoal((prevGoal) => Math.min(prevGoal + 500, 20000));
  };

  const decrement = () => {
    setGoal((prevGoal) => Math.max(prevGoal - 500, 0));
  };

  const handleGoal = () => {
    onGoalChange(goal);
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
            onPress={handleGoal}
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
    width: "100%",
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
    width: "100%",
    backgroundColor: Colors.orange_fonce,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

