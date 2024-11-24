'use client';

import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text,
    TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Calendar from '../(component)/calendar';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ArrowRight, Footprints, LocateIcon, TimerIcon} from 'lucide-react-native';
import { Pedometer } from 'expo-sensors';
import Logo from '../(component)/logo';
import Discover from '../(component)/discover';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomePage() {
    const [pourcentage, setPourcentage] = useState(0);
    const [goal, setGoal] = useState(10000);

    const [userName, setUserName] = useState('Jane');

    const height = 1.7; // in meters
    const strideLength = height * 0.414;
    const [PedomaterAvailability, SetPedomaterAvailability] = useState('');
    const [totalStep, setTotalStep] = useState(0);

    const Dist = totalStep * strideLength / 1000; // in KM
    const DistanceCovered: number = Number(Dist.toFixed(2));

    // average walking
    const ms = 1.34; // en m/s
    const MET = 3.5

    // Assume an average weight of 63 kg
    const weight = 70; // kg
    const time = Number((Dist * 1000 / ms / 3600).toFixed(2)) // in hours

    // Calories burned
    const caloriesBurnt = Number((time * MET * weight * 3.5  / 200 * 60).toFixed(0))


    useEffect(() => {
        const checkPermissions = async () => {
            const { status } = await Pedometer.requestPermissionsAsync();
            if (status === 'granted') {
                SetPedomaterAvailability('Available');
                subscribe();
            } else {
                SetPedomaterAvailability('No, permission denied');
            }
        };

        checkPermissions();
    }, []);

    useEffect(() => {
        const subscription = Pedometer.watchStepCount(result => {
            setTotalStep(result.steps);
        });

        return () => subscription && subscription.remove();
    }, []);

    useEffect(() => {
        setPourcentage((totalStep / goal) * 100);
    }, [totalStep]);

    let subscribe = () => {
        const subscription = Pedometer.watchStepCount(result => {
            setTotalStep(result.steps);
        });
        Pedometer.isAvailableAsync().then(
            result => {
                SetPedomaterAvailability(String(result));
            },
            error => {
                SetPedomaterAvailability(error);
            }
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                <ScrollView>
                    <Logo />


                    <View style={styles.header}>
                        <View>
                            <Text style={styles.text}>Welcome back {userName},</Text>
                        </View>

                        <TouchableWithoutFeedback>
                            <View style={styles.headerButton}>
                                <Image source={require('./../../assets/images/step.png')} style={styles.headerButtonImage} />
                                <Text style={styles.headerButtonText}>{totalStep}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <Calendar />

                    <View style={styles.placeholder}>
                        {/*first*/}
                        <View style={styles.first}>
                            <AnimatedCircularProgress
                                size={210}
                                width={15}
                                fill={pourcentage}
                                rotation={0}
                                tintColor="#ECA15A"
                                backgroundColor="#f9dfb9"
                                lineCap="round"
                            >
                                {() => (
                                    <View style={styles.innerCircle}>
                                        <Image source={require('./../../assets/images/step.png')} style={styles.image} />
                                        <Text style={styles.text}>{totalStep}</Text>
                                    </View>
                                )}
                            </AnimatedCircularProgress>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.dataButton}>
                                    <LocateIcon />
                                    <Text style={styles.dataText}>{DistanceCovered} km</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dataButton}>
                                    <TimerIcon />
                                    <Text style={styles.dataText}>{time}'</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dataButton}>
                                    <Image source={require('./../../assets/images/fire-icon.png')} style={styles.fireIcon} />
                                    <Text style={styles.dataText}>{caloriesBurnt} cal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*second*/}
                        <View style={styles.second}>
                            <View style={styles.secondTitle}>
                                <Text style={styles.text}>Set up your Goal</Text>
                                <TouchableOpacity>
                                    <ArrowRight color="#5E83C0" size={30} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.secondTitle}>
                                <View style={styles.infoRow}>
                                    <Footprints />
                                    <Text style={styles.infoText}>{goal}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Image source={require('./../../assets/images/fire-icon.png')} style={styles.fireIcon} />
                                    <Text style={styles.infoText}>N/A</Text>
                                </View>
                            </View>
                        </View>

                        {/*third*/}
                        <View style={styles.third}>
                            <View style={styles.thirdTitle}>
                                <Text style={styles.text}>Discover Montreal,</Text>
                                <TouchableOpacity>
                                    <ArrowRight color="#5E83C0" size={30} />
                                </TouchableOpacity>
                            </View>
                            <Discover/>
                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}



const Colors = {
    primary: '#ECA15A',
    secondary: '#4E8EF2',
    background: '#fbf2ea',
    textPrimary: '#000',
    textSecondary: '#fff',
};
const ButtonBase = {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
        fontWeight: 'bold',
    },

    header: { // welcome back ...,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    headerButton: {
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        alignItems: 'center',
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
        fontWeight: 'bold',
    },

    // part which depends on the day on calendar
    placeholder: {
        alignItems: 'center',
        paddingHorizontal: 20,
        flex: 1,
    },

    // first quartet , circular progress + stats
    first: {
        ...commonCardStyle,
        backgroundColor : Colors.background,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    innerCircle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height: 50,
        marginBottom: 20,
    },
    fireIcon: {
        width: 40,
        height: 30
    },
    buttonContainer: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    dataButton: {
        ...ButtonBase,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        opacity: 0.8,
    },
    dataText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
    },

    // third quartet , discover your city
    second: {
        ... commonCardStyle,
        backgroundColor : '#fff',
        width: "100%",
        marginTop: 20,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    secondTitle: {
        paddingVertical : 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
    },

    // third quartet , discover your city
    third: {
        width: "100%",
        marginTop: 20,
        paddingVertical: 20,
    },
    thirdTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})