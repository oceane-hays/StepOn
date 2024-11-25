import React, { useRef } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import MapView, { Region } from "react-native-maps";
import { LATITUDE_DELTA } from "@/services/LATITUDE_DELTA";
import { LONGITUDE_DELTA } from "@/services/LONGITUDE_DELTA";
import { Colors } from "@/services/COLORS";
import { CircularItems } from "@/app/(component)/RouteComponent/CircularItems";
import { Footprints, MapPin, TimerIcon } from "lucide-react-native";
import { formattedSteps } from "@/services/formattedSteps";

const DEFAULT_LOCATION: Region = {
    latitude: 45.48833488659076,
    longitude: -73.63675359307672,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

export default function MapRoute() {
    const mapRef = useRef<MapView>(null);

    const handleTakeABreak = () => {
        console.log("Take a Break pressed");
        // Add your logic for taking a break
    };

    const handleFinish = () => {
        console.log("Finish pressed");
        // Add your logic for finishing the route
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={DEFAULT_LOCATION}
                />
                <View style={styles.cardContainer}>
                    <View style={{...styles.card, padding: 20, width: '85%', alignSelf:'center'}}>
                        <CircularItems icon={<Footprints color={Colors.orange_fonce} />} numb={0} pourcent={10} />
                        <CircularItems icon={<TimerIcon color={Colors.orange_fonce} />} numb={0} pourcent={30} />
                        <CircularItems icon={<MapPin color={Colors.orange_fonce} />} numb={0} pourcent={60} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.card}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: Colors.bleu_clair }]}
                            onPress={handleTakeABreak}
                        >
                            <Text style={styles.buttonText}>Take a Break</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: Colors.orange_fonce }]}
                            onPress={handleFinish}
                        >
                            <Text style={styles.buttonText}>Finish</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    cardContainer: {
        borderRadius: 20,
        backgroundColor: "white",
        position: "absolute",
        bottom: 20,
        left: 15,
        right: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: "bold",
    },
    divider: {
        alignSelf: 'center',
        height: 1,
        backgroundColor: '#ccc',
        width: '90%',
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        borderRadius: 20,
        padding: 15,
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
});

