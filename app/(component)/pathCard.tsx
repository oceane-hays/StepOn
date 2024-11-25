import React, {useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from "react-native-maps";
import {LATITUDE_DELTA} from "@/services/LATITUDE_DELTA";
import {LONGITUDE_DELTA} from "@/services/LONGITUDE_DELTA";
import {Colors} from "@/services/COLORS";
import {Clock, Footprints, MapPin, SunIcon} from "lucide-react-native";
import {InfoItem} from "@/app/(component)/infoItem";
import {formattedTime} from "@/services/formattedTime";
import {formattedSteps} from "@/services/formattedSteps";

const default_location: any = {
    latitude: 45.48833488659076,
    longitude: -73.63675359307672,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

export default function PathCard({ onPress, time, steps, location } : any)  {
    const mapRef: any = useRef();

    return (
        <View style={styles.card}>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={default_location}
                />


                <View style={styles.details}>
                    <View style={styles.contentContainer}>
                        <View >
                            <InfoItem icon={<MapPin size={20} color={Colors.bleu_fonce} />} text={location} />
                            <InfoItem icon={<Footprints size={20} color={Colors.bleu_fonce} />} text={`${formattedSteps(steps)} steps`} />
                            <InfoItem icon={<Clock size={20} color={Colors.bleu_fonce} />} text={formattedTime(time)} />
                            <InfoItem icon={<SunIcon size={20} color={Colors.bleu_fonce} />} text='21°C' />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: "flex-end",
        borderRadius: 20,
        backgroundColor: "#fff", // Couleur de fond pour éviter des problèmes visuels
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 2 }, // Augmentez légèrement pour plus de relief
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Ombre pour Android
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20, // Même rayon que celui de mapContainer
    },
    card: {
        borderRadius: 20,
        overflow: "visible", // Adapter selon la plateforme
        height: "95%",
        backgroundColor: "#fff", // Assurez-vous que la couleur est définie
        shadowColor: Colors.gris_fonce,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8, // Android
    },
    details: {
        width: "90%",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        padding: 15,
    },
    timeText: {
        fontSize: 16,
        marginBottom: 5,
    },
    stepsText: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.bleu_fonce,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    contentContainer: {
        padding: 10,
    },
});
