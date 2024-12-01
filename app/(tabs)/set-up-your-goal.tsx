import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ArrowLeft} from "lucide-react-native";
import {Colors} from "@/services/COLORS";
import Logo from "@/app/(component)/logo";
import Icon from "react-native-vector-icons/Ionicons";

export default function SetUpYourGoal() {
    const [goal, setGoal] = useState(0);
    const router = useRouter();

    const increment = () => {
        setGoal(prevGoal => Math.min(prevGoal + 500, 20000));
    };

    const decrement = () => {
        setGoal(prevGoal => Math.max(prevGoal - 500, 0));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <Logo />


                <View style={styles.header}>
                    <TouchableOpacity style={styles.button}>
                        <ArrowLeft size={30} color={Colors.orange_fonce} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Set Up Your Goal</Text>
                    <View style={styles.placeholder} />
                </View>


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
                    onPress={() => router.push({
                        pathname: '/plan-route',
                        params: { goal }
                    })}
                >
                    <Text style={styles.submitButtonText}>Set Goal</Text>
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
        flex: 0.5,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.orange_fonce,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 10,
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

    buttonText: {
        fontSize: 24,
        color: 'white',
    },
    goalContainer: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    goalText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    unitText: {
        fontSize: 16,
        color: '#666',
    },
    submitButton: {
        backgroundColor: Colors.orange_fonce,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 50, // Match the width of the button
    },
});

