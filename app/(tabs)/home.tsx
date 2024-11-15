'use client'
import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, SafeAreaView, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Calendar from '../(component)/calendar'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {ArrowRight, LocateIcon, TimerIcon} from 'lucide-react-native'
import { Pedometer } from 'expo-sensors'
import Logo from '../(component)/logo'
import Discover from '../(component)/discover'


export default function HomePage() {
    const [pourcentage, setPourcentage] = useState(0)
    const [time, setTime] = useState(0)
    const [userName, setUserName] = useState("Jane")

    const height = 169;
    const strideLength = height * 0.414
    const stepParKilometer = 1000 / strideLength
    const [PedomaterAvailability, SetPedomaterAvailability] = useState("");
    const [totalStep, setTotalStep] = useState(0)

    const Dist = totalStep / stepParKilometer;
    const DistanceCovered : number = Number.parseInt(Dist.toFixed(2));

    const caloriesBurnt = 60 * DistanceCovered;


    useEffect(() => {
        const checkPermissions = async () => {
            const { status } = await Pedometer.requestPermissionsAsync();
            if (status === 'granted') {
                SetPedomaterAvailability("Available");
                subscribe();
            } else {
                SetPedomaterAvailability("No, permission denied");
            }
        };

        checkPermissions(); // Appel de la fonction async interne
    }, []);


    useEffect(() => {
        const subscription = Pedometer.watchStepCount(result => {
            setTotalStep(result.steps);
        });

        return () => subscription && subscription.remove();
    }, []);

    useEffect(() => {
        const targetSteps = 10000;
        setPourcentage((totalStep / targetSteps) * 100);
    }, [totalStep]);

    let subscribe = () => {
        const subscription = Pedometer.watchStepCount((result) => {
            setTotalStep(result.steps);
        });
        Pedometer.isAvailableAsync().then(
            (result) => {
                SetPedomaterAvailability(String(result));
            },
            (error) => {
                SetPedomaterAvailability(error);
            }
        );
    };



    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>

                    <Logo />
                    <Text>
                        Is Pedometer available on the device: {PedomaterAvailability === "Permission denied"
                        ? "No, permission denied."
                        : PedomaterAvailability}
                    </Text>

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

                        <View style={styles.first}>
                            <AnimatedCircularProgress
                                size={210}
                                width={15}
                                fill={pourcentage} // remplit en fonction du nombre de pas
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
                                    <LocateIcon/>
                                    <Text style={styles.dataText}>{DistanceCovered} km</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dataButton}>
                                    <TimerIcon/>
                                    <Text style={styles.dataText}>{time}'</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dataButton}>
                                    <Image source={require('./../../assets/images/fire-icon.png')} style={styles.fireIcon} />
                                    <Text style={styles.dataText}>{caloriesBurnt} cal</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.second}>
                            <TouchableOpacity>
                                <Text style={styles.secondPartText}>F I N D   A   N E W   W A Y</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.third}>

                            <View style={styles.thirdTitle}>
                                <Text style={styles.thirdPartText}>Discover Montreal,</Text>
                                <TouchableOpacity  style={styles.goInButton}>
                                    {/*onPress={goInDiscover}*/}
                                    <ArrowRight color="#5E83C0" size={30}/>
                                </TouchableOpacity>
                            </View>
                            <Discover/>
                        </View>
                    </View>


                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },

    // welcome back ...,
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 30,
    },
    headerButton: {
        height: 30,
        borderRadius: 30,
        flexDirection: 'row',
        backgroundColor: '#ECA15A',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerButtonImage: {
        height: 25,
        width: 25,
        paddingLeft: 10

    },
    headerButtonText: {
        fontSize: 13,
        color: '#000',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },

    // page principale qui contient first et second
    placeholder: {
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
    },
    // premier carre d'information : circular progress, stats
    first: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: '#fbf2ea',
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
        alignItems: 'center',

        justifyContent: 'space-between',
        backgroundColor: '#ECA15A',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        width: '100%', // Assure une largeur uniforme (si le parent a une largeur spécifique)
        height:80,    // Définit une hauteur fixe
        opacity: 0.8,
    },
    dataText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
    },

    // Deuxieme carre d'information : Trouver un nouveau parcours
    second: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: '#fbf2ea',
        // borderColor: '#4E8EF2',
        // borderWidth : 2,
    },
    secondPartText: {
        fontSize: 15,
        color: '#4E8EF2',
        fontWeight: 'bold',
    },

    // Troisième carré d'iformation : Discover Montreal
    third: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    thirdTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    thirdPartText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    goInButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
})