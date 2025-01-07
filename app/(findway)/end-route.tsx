import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {router, useGlobalSearchParams} from "expo-router";
import Logo from "@/app/(component)/logo";
import {Colors} from "@/services/COLORS";
import {TimerIcon} from "lucide-react-native";

interface CompletionScreenProps {
    steps: number;
    calories: number;
    duration: string;
}


const WavyBackground = () => (
    <Svg
        height="40%"
        width={Dimensions.get('window').width}
        viewBox="0 0 1440 320"
        style={styles.waves}
    >
        <Path
            fill="#ff69b4"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <Path
            fill="#ffd700"
            opacity="0.8"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,176C672,192,768,192,864,176C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <Path
            fill="#87ceeb"
            opacity="0.6"
            d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,240C672,256,768,256,864,240C960,224,1056,192,1152,192C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
    </Svg>
);

export default function CompletionScreen({ steps, calories, duration }: CompletionScreenProps) {

    const glob = useGlobalSearchParams();


    return (
        <View style={styles.container}>

            <View style={styles.content}>
                <Logo/>
                <Image source={require('./../../assets/images/reward.png')}/>
                <Text style={styles.title}>Congratulations!</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Image
                            source={require("../../assets/images/stop.png")}
                            style={styles.fireIcon}
                        />
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>steps</Text>

                    </View>
                    <View style={styles.statItem}>
                        <Image
                            source={require("../../assets/images/fire-icon.png")}
                            style={styles.fireIcon}
                        />
                        <Text style={styles.statValue}>2</Text>
                        <Text style={styles.statLabel}>calories</Text>
                    </View>
                    <View style={styles.statItem}>
                        <TimerIcon />
                        <Text style={styles.statValue}>{glob.elapsed}</Text>
                        <Text style={styles.statLabel}>duration</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={ () => {
                    router.replace('/(tabs)');
                }}>
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
            <WavyBackground />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 40,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 40,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    button: {
        backgroundColor: Colors.orange_clair,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    waves: {
        position: 'absolute',
        bottom: 0,
    },
    fireIcon: {
        width: 40,
        height: 30,
    },
});