import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView, TextInput, Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Logo from "@/app/(component)/logo";
import {Colors} from "@/services/COLORS";
import {router} from "expo-router";

export default function HealthData() {
    const [weight, setWeight] = useState(124);
    const [height, setHeight] = useState('');
    const [isImperial, setIsImperial] = useState(false)

    const kgWeight = Math.round(weight * 0.453592);

    return (
        <SafeAreaView style={styles.container}>
            <Logo/>
            <View style={styles.content}>
                <Text style={styles.title}>How much do you weigh?</Text>
                <Text style={styles.subtitle}>
                    This is used to set up and calculate{'\n'}your recommended daily consumption.
                </Text>

                <View style={styles.weightDisplay}>
                    <Text style={styles.weightNumber}>{weight}</Text>
                    <Text style={styles.weightUnit}>lbs</Text>
                </View>

                <Text style={styles.kgWeight}>{kgWeight} kg</Text>

                <Slider
                    style={styles.slider}
                    minimumValue={50}
                    maximumValue={400}
                    value={weight}
                    onValueChange={setWeight}
                    minimumTrackTintColor={Colors.bleu_clair}
                    maximumTrackTintColor="#EEEEEE"
                    step={1}
                />

                <Text style={styles.title}>How tall are you ?</Text>

                <TextInput style={styles.input}
                           placeholder={isImperial ? "Height (in)" : "Height (cm)"}
                           value={height}
                           onChangeText={setHeight}
                           keyboardType="numeric"
                           />

                <View style={styles.switchContainer}>
                    <Text style={styles.weightUnit}>Metric</Text>
                    <Switch
                        trackColor={{ false: Colors.orange_clair , true: Colors.bleu_clair }}
                        thumbColor={isImperial ? Colors.orange_clair : Colors.bleu_clair}
                        onValueChange={() => {
                            setIsImperial(!isImperial)
                            if (height) {
                                setHeight(isImperial ? (parseFloat(height) * 2.54).toFixed(1) : (parseFloat(height) / 2.54).toFixed(1))
                            }                        }}
                        value={isImperial}
                    />
                    <Text style={styles.weightUnit}>Imperial</Text>
                </View>


                <TouchableOpacity style={styles.calculateButton} onPress={ () => {
                    router.push("/(tabs)")
                }}>
                    <Text style={styles.calculateButtonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
    },
    weightDisplay: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    weightNumber: {
        fontSize: 48,
        fontWeight: '300',
        color: '#000',
    },
    weightUnit: {
        fontSize: 20,
        color: '#666',
        marginBottom: 8,
        marginLeft: 4,
    },
    kgWeight: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 40,
    },
    updateText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 40,
    },
    calculateButton: {
        backgroundColor: Colors.bleu_clair,
        width: '100%',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calculateButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 70,
        fontSize: 40,
        fontWeight: '300',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 40,
        marginBottom: 40,
        textAlign: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 80,
        justifyContent: 'space-between',
        width: '60%',
    },
});