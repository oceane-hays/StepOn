import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Logo from "@/app/(component)/logo";
import Filter from "@/app/(component)/filter";
import {ArrowLeft} from "lucide-react-native";
import {Colors} from "@/services/COLORS";
import {height} from "@/services/height";

export default function PlanRoute() {
  const [steps, setSteps] = useState(1000);
  const [scenery, setScenery] = useState<string | null>(null);
  const [routeType, setRouteType] = useState<string | null>(null);

  const incrementSteps = () => setSteps((prev) => Math.min(prev + 1000, 10000));
  const decrementSteps = () => setSteps((prev) => Math.max(prev - 1000, 1000));

  return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ marginBottom: 90 }}>
                    <Logo />
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button}>
                        <ArrowLeft size={30} color={Colors.orange_fonce} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Plan Your Route</Text>
                    <View style={styles.placeholder} />
                </View>
            </View>

            <View style={{
                ...card,
                flex : 1,
                justifyContent: 'space-around',
                backgroundColor: Colors.gris,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 20,
            }}>
                <Filter
                    incrementSteps={incrementSteps}
                    decrementSteps={decrementSteps}
                    steps={steps}
                    scenery={scenery}
                    setScenery={setScenery}
                    routeType={routeType}
                    setRouteType={setRouteType}
                />

                {/* Action Buttons */}
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.actionButton, styles.outlineButton]}>
                        <Text style={styles.outlineButtonText}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
  );
}



const card = {
    marginHorizontal: 20,
    marginBottom: 30,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        ...card,
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
    iconButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        marginRight: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        padding: 16,
        borderRadius: 4,
        backgroundColor: Colors.orange_fonce,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    actionButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    outlineButton: {
        backgroundColor: '#f0f0f0',
    },
    outlineButtonText: {
        fontSize: 16,
        color: Colors.orange_fonce,
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
    placeholder: {
        width: 50, // Match the width of the button
    },
});

