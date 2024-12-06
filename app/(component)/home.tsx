import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  ArrowRight,
  Footprints,
  LocateIcon,
  TimerIcon,
} from "lucide-react-native";
import { Pedometer } from "expo-sensors";
import LottieView from "lottie-react-native";
import Logo from "@/app/(component)/logo";
import Discover from "@/app/(component)/discover";
import Calendar from "@/app/(component)/calendar";
import { router } from "expo-router";

export default function HomePage() {
  const [percentage, setPercentage] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [goal, setGoal] = useState(10000);
  const [userName, setUserName] = useState("Jane");
  const [totalSteps, setTotalSteps] = useState(0);
  const [pedometerAvailability, setPedometerAvailability] = useState("");

  const height = 1.7; // in meters
  const strideLength = height * 0.414;
  const distanceKm = (totalSteps * strideLength) / 1000;
  const distanceCovered = Number(distanceKm.toFixed(2));

  const averageSpeed = 1.34; // m/s
  const MET = 3.5;
  const weight = 70; // kg
  const timeHours = Number(
    ((distanceKm * 1000) / averageSpeed / 3600).toFixed(2)
  );
  const caloriesBurnt = Number(
    (((timeHours * MET * weight * 3.5) / 200) * 60).toFixed(0)
  );

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Pedometer.requestPermissionsAsync();
      if (status === "granted") {
        setPedometerAvailability("Available");
        subscribeToPedometer();
      } else {
        setPedometerAvailability("No, permission denied");
      }
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    setPercentage((totalSteps / goal) * 100);
  }, [totalSteps, goal]);

  const subscribeToPedometer = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setTotalSteps(result.steps);
      setIsCounting(true);
    });

    return () => subscription && subscription.remove();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Logo />

        <View style={styles.header}>
          <Text style={styles.text}>Welcome back {userName},</Text>
          <TouchableWithoutFeedback>
            <View style={styles.headerButton}>
              <Image
                source={require("../../assets/images/step.png")}
                style={styles.headerButtonImage}
              />
              <Text style={styles.headerButtonText}>{totalSteps}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Calendar />

        <View style={styles.placeholder}>
          <View style={styles.first}>
            <AnimatedCircularProgress
              size={210}
              width={15}
              fill={percentage}
              rotation={0}
              tintColor="#ECA15A"
              backgroundColor="#f9dfb9"
              lineCap="round"
            >
              {() => (
                <View style={styles.innerCircle}>
                  {isCounting ? (
                    <LottieView
                      autoPlay
                      style={{ height: 110, width: 110 }}
                      source={require("../../assets/images/walking.json")}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/images/stop.png")}
                      style={{ height: 90, width: 90 }}
                    />
                  )}
                  <Text style={styles.text}>{totalSteps}</Text>
                </View>
              )}
            </AnimatedCircularProgress>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.dataButton}>
                <LocateIcon />
                <Text style={styles.dataText}>{distanceCovered} km</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dataButton}>
                <TimerIcon />
                <Text style={styles.dataText}>{timeHours} h</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dataButton}>
                <Image
                  source={require("../../assets/images/fire-icon.png")}
                  style={styles.fireIcon}
                />
                <Text style={styles.dataText}>{caloriesBurnt} cal</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.second}>
            <View style={styles.secondTitle}>
              <Text style={styles.text}>Set up your Goal</Text>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "set-up-your-goal",
                    params: {
                      goal: goal,
                    },
                  });
                }}
              >
                <ArrowRight color="#5E83C0" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.secondTitle}>
              <View style={styles.infoRow}>
                <Footprints />
                <Text style={styles.infoText}>{goal}</Text>
              </View>
              <View style={styles.infoRow}>
                <Image
                  source={require("../../assets/images/fire-icon.png")}
                  style={styles.fireIcon}
                />
                <Text style={styles.infoText}>N/A</Text>
              </View>
            </View>
          </View>

          <View style={styles.third}>
            <View style={styles.thirdTitle}>
              <Text style={styles.text}>Discover Montreal,</Text>
              <TouchableOpacity>
                <ArrowRight color="#5E83C0" size={30} />
              </TouchableOpacity>
            </View>
            <Discover />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Colors = {
  primary: "#ECA15A",
  secondary: "#4E8EF2",
  background: "#fbf2ea",
  textPrimary: "#000",
  textSecondary: "#fff",
};

const ButtonBase = {
  borderRadius: 10,
  paddingVertical: 20,
  paddingHorizontal: 20,
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 10,
  backgroundColor: Colors.primary,
};

const commonCardStyle = {
  borderRadius: 20,
  paddingHorizontal: 20,
  paddingVertical: 20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.textSecondary,
  },
  text: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  headerButton: {
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerButtonImage: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "bold",
  },
  placeholder: {
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  first: {
    ...commonCardStyle,
    backgroundColor: Colors.background,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  fireIcon: {
    width: 40,
    height: 30,
  },
  buttonContainer: {
    justifyContent: "center",
    marginLeft: 10,
  },
  dataButton: {
    ...ButtonBase,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    opacity: 0.8,
  },
  dataText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "bold",
  },
  second: {
    ...commonCardStyle,
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  secondTitle: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  third: {
    width: "100%",
    marginTop: 20,
    paddingVertical: 20,
  },
  thirdTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
