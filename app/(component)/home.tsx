import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  Footprints,
  LocateIcon,
  TimerIcon,
} from "lucide-react-native";
import { Pedometer } from "expo-sensors";
import LottieView from "lottie-react-native";
import Logo from "@/app/(component)/logo";
import Calendar from "@/app/(component)/calendar";
import SetUpYourGoal from "@/app/(component)/set-up-your-goal";
import {UserData} from "@/app/(component)/user";



export default function HomePage(users : any) {
  const [percentage, setPercentage] = useState(100);
  const [isCounting, setIsCounting] = useState(false);

  const userGoal: number = users['users'][0]?.target_steps
  const [goal, setGoal] = useState(10000);
  const [totalSteps, setTotalSteps] = useState(0);
  const [pedometerAvailability, setPedometerAvailability] = useState("");

  const userHeight: number = users['users'][0]?.height / 100
  const [height, setHeight] = useState(1.7) // in meters

  const userWeight: number = users['users'][0]?.weight
  const [weight, setWeight] = useState(60); // in kg

  const strideLength = useMemo(() => height * 0.414, [height]);
  const distanceKm = useMemo(() => (totalSteps * strideLength) / 1000, [totalSteps, strideLength]);
  const distanceCovered = useMemo(() => Number(distanceKm.toFixed(2)), [distanceKm]);

  const averageSpeed = 1.34; // m/s
  const MET = 3.5;
  const timeHours = useMemo(() => Number(((distanceKm * 1000) / averageSpeed / 3600).toFixed(2)), [distanceKm]);
  const caloriesBurnt = useMemo(() => Number((((timeHours * MET * weight * 3.5) / 200) * 60).toFixed(0)), [timeHours, weight]);


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


  const handleGoalChange = (newGoal: number) => {
    setGoal(newGoal);
    // You might want to save this to AsyncStorage or your backend here
  };

  console.log(users)

  //
  return (
      <SafeAreaView style={styles.container}>
        <Logo />

          <View style={styles.header}>
            <Text style={styles.text}>Hello { users['users'][0]?.name },</Text>
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


          <Calendar/>


          <View style={styles.placeholder}>

            <View style={{backgroundColor: Colors.background, height:'100%'}}>
              <View style={styles.first}>
                <View style={{justifyContent:'space-around', alignItems:'center', }}>
                  <AnimatedCircularProgress
                      size={210}
                      width={15}
                      fill={percentage}
                      rotation={0}
                      tintColor={percentage >= 100 ? "#8DACD2" : "#ECA15A"}
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
                        </View>
                    )}
                  </AnimatedCircularProgress>
                  {percentage >= 100 && (
                      <Text style={styles.congratsText}>Congratulations! You've reached your goal!</Text>
                  )}

                </View>

                <View style={styles.buttonContainer}>
                  <View style={styles.dataButton}>
                    <LocateIcon />
                    <Text style={styles.dataText}>{distanceCovered} km</Text>
                  </View>

                  <View style={styles.dataButton}>
                    <TimerIcon />
                    <Text style={styles.dataText}>{timeHours} h</Text>
                  </View>

                  <View style={styles.dataButton}>
                    <Image
                        source={require("../../assets/images/fire-icon.png")}
                        style={styles.fireIcon}
                    />
                    <Text style={styles.dataText}>{caloriesBurnt} cal</Text>
                  </View>
                </View>


              </View>


              <View style={styles.second}>
                <View>
                  <Text style={styles.secTitle}>Change your Goal</Text>
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

                <SetUpYourGoal currentGoal={goal} onGoalChange={handleGoalChange} />
              </View>
            </View>
          </View>


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
  paddingVertical: 15,
  paddingHorizontal: 15,
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 5,
  backgroundColor: Colors.primary,
};

const commonCardStyle = {
  borderRadius: 20,
  paddingHorizontal: 20,
  paddingTop: 20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.textSecondary,
  },
  text: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
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
    height: '100%',
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  first: {
    ...commonCardStyle,
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
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    margin: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  secTitle: {
    fontSize : 20,
    fontWeight: '600',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  secondTitle: {
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  congratsText: {
    fontSize: 12,
    color: "#8DACD2",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

